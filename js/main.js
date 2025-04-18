$(document).ready(function () {
  // Previous Button
  $(".previous").click(function () {
    if (animating) return false;
    animating = true;
    current_fs = $(this).closest("fieldset");
    previous_fs = current_fs.prev("fieldset");
    $(".zr-progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");
    previous_fs.fadeIn();
    current_fs.fadeOut(function () {
      animating = false;
    });
  });

  var current_fs, next_fs, previous_fs;
  var animating;
  // Save & Next Button
  $(".save-next").click(function () {
    current_fs = $(this).closest("fieldset");
    next_fs = current_fs.next("fieldset");
    var formData = current_fs
      .find("input, select, textarea, radio")
      .serialize();
    var formDataObj = {};
    // get feildset value
    formData.split("&").forEach(function (item) {
      var parts = item.split("=");
      formDataObj[decodeURIComponent(parts[0])] = decodeURIComponent(
        parts[1] || ""
      );
    });

    // Scroll helper function
    function scrollToFirstError() {
      let firstError = $(".error:visible,.checkbox:visible").first();
      if (firstError.length) {
        $("html, body").animate(
          {
            scrollTop: firstError.offset().top - 100,
          },
          500
        );
      }
    }
    // Loader Show
    function showLoader() {
      $(".form-loader").show();
    }
    // Loader hide
    function hideLoader() {
      $(".form-loader").fadeOut();
    }
    // Check validation conditions
    if (formDataObj["fieldset"] == 1) {
      if (!validateForm1()) {
        scrollToFirstError();
        return false;
      }
    } else if (formDataObj["fieldset"] == 2) {
      if (!validateForm2()) {
        scrollToFirstError();
        return false;
      }
    } else if (formDataObj["fieldset"] == 3) {
      if (!validateForm3()) {
        scrollToFirstError();
        return false;
      }
    } else if (formDataObj["fieldset"] == 4) {
      if (!validateForm4()) {
        scrollToFirstError();
        return false;
      }
    }
    showLoader();
    try {
      $.ajax({
        url: "http://127.0.0.1:8000/api/leads/customcode", // API endpoint
        type: "POST",
        header: "Content-Type: application/json",
        data: formData,
        success: function (response) {
          if (response.lead && response.lead.marital_status) {
            let marital_status =
              response.lead.marital_status === "married" ? "married" : null;
            $(".marital_status_1").val(marital_status);
          } else {
            $(".marital_status_1").val("");
          }
          hideLoader();
          if (response.message === "Successfully Submitted") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            $("form")[0].reset();
            $(".select2").val(null).trigger("change");
            $(".zr-progressbar li").removeClass("active");
            $(".zr-progressbar li").eq(0).addClass("active");
            $("fieldset").hide();
            $("fieldset").eq(0).show();
            $(
              "#canada_details_block, .additional_relationsips_append, .family_members_block_append,#addMoreRelationship,#addMoreFamilyFriends,#previouse_spouse_details_married,#other_statuses_in_canada,#spouse_status_in_country_other"
            ).css("display", "none");
            $(".show_message").css({
              width: "100%",
              display: "block",
              important: true,
            });
            setTimeout(function () {
              $(".show_message").fadeOut();
              hideLoader();
            }, 7000);
            return;
          }
          if (response.lead && response.lead.id) {
            // Append the ID to the hidden input field
            $("input[name='lead_id']").val(response.lead.id);
          }
          $(".zr-progressbar li")
            .eq($("fieldset").index(next_fs))
            .addClass("active");
          next_fs.fadeIn();
          current_fs.fadeOut(function () {
            animating = false;
          });
        },
        error: function (xhr, status, error) {
          console.log("Error:", error);
          animating = false;
          hideLoader();
        },
      });
    } catch (error) {
      console.error("Try-Catch Error:", error.message);
      hideLoader();
    }

    // if (animating) return false;
    // animating = true;
    // $(".zr-progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    // next_fs.fadeIn();
    // current_fs.fadeOut(function() {
    //     animating = false;
    // });
  });
});

// drop down serach bar
$(".select2").select2({
  placeholder: "Please select",
  allowClear: true,
});

// error remove on input
function handleInputChange() {
  const checkbox = $(this).attr("type");
  if ($(this).is(":radio")) {
    if (checkbox) {
      $(this).closest(".erroremove").next(".error").hide();
    } else {
      $(this).closest(".erroremove").next(".error").show();
    }
  } else if (checkbox == "checkbox") {
    if ($(this).is(":checked")) {
      $(this).closest(".checkbox").next(".checkbox").hide();
    } else {
      $(this).closest(".checkbox").next(".checkbox").show();
    }
  } else {
    if ($(this).val().trim() !== "") {
      $(this).next(".error").hide();
      $(this).next(".select2-container").next(".error").remove();
    } else {
      $(this).next(".error").show();
    }
  }
}

$(document).on(
  "change  blur",
  "input, select, textarea",
  handleInputChange
);

function initializeDatePickers() {
  // Employment History Perivious date disabled Status Start Date
  $(".where_did_you_work_status_start_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    maxDate: 0,
    yearRange: "1950:+0",
    onSelect: function (selectedDate) {
      var minDate = $(this).datepicker("getDate"); 
      $(this)
        .closest(".form-group")
        .parent()
        .next()
        .find(".where_did_you_work_status_end_date")
        .datepicker("option", "minDate", minDate);
      handleInputChange.call(this);
    },
  });

  $(".where_did_you_work_status_end_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });

  // Employment History Perivious date disabled First Working Day
  $(".first_working_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    maxDate: 0,
    yearRange: "1950:+0",
    onSelect: function (selectedDate) {
      var minDate = $(this).datepicker("getDate"); 
      $(".last_working_date").datepicker("option", "minDate", minDate); // Set minDate for last working date
      handleInputChange.call(this);
    },
  });

  $(".last_working_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });

  // provide details of all previous relationship
  $(".additional_previous_relationship_start_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    maxDate: 0,
    yearRange: "1950:+0",
    onSelect: function (selectedDate) {
      var minDate = $(this).datepicker("getDate"); 
      $(".additional_previous_relationship_end_date").datepicker(
        "option",
        "minDate",
        minDate
      ); // Set minDate for last working date
      handleInputChange.call(this);
    },
  });

  $(".additional_previous_relationship_end_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });

  // provide details of all previous relationship
  $(".relationship_start_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    maxDate: 0,
    yearRange: "1950:+0",
    changeYear: true,
    onSelect: function (selectedDate) {
      var minDate = $(this).datepicker("getDate"); 
      $(".relationship_end_date").datepicker("option", "minDate", minDate); // Set minDate for last working date
      handleInputChange.call(this);
    },
  });

  $(".relationship_end_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });

  // provide details of your status in Canada
  $(".status_start_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "1950:+0",
    maxDate: 0,
    onSelect: function (selectedDate) {
      var minDate = $(this).datepicker("getDate"); 
      $(".status_end_date").datepicker("option", "minDate", minDate); // Set minDate for last working date
      handleInputChange.call(this);
    },
  });

  $(".status_end_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });

  // provide your details for all the test you have taken in past
  $(".language_test_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    maxDate: 0,
    yearRange: "1950:+0",
    onSelect: function (selectedDate) {
      var minDate = $(this).datepicker("getDate"); 
      $(".language_result_date").datepicker("option", "minDate", minDate); // Set minDate for last working date
      handleInputChange.call(this);
    },
  });

  $(".language_result_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });

  // provide your details  of your status in Canada
  $(".status_start_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    onSelect: function (selectedDate) {
      var minDate = $(this).datepicker("getDate"); 
      $(".status_end_date").datepicker("option", "minDate", minDate); // Set minDate for last working date
      handleInputChange.call(this);
    },
  });

  $(".status_end_date").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
  });
}

// Initialize datepickers for existing fields
initializeDatePickers();

document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

$(document).ready(function () {
  var phoneInput = document.querySelector("#phone");
  var iti = window.intlTelInput(phoneInput, {
    initialCountry: "ca",
    preferredCountries: ["us", "ca", "gb"],
    separateDialCode: true,
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js",
  });

  var phoneInputReferral = document.querySelectorAll(
    '[name="referral_phone[]"]'
  );

  phoneInputReferral.forEach(function (input) {
    window.intlTelInput(input, {
      initialCountry: "ca",
      preferredCountries: ["us", "ca", "gb"],
      separateDialCode: true,
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js",
    });
  });

  $(".iti__country-list").attr("tabindex", "-1");

  setTimeout(function () {
    $(".selectpicker").selectpicker();
  }, 500);

  $(
    "#dob, #relationship_start_date, #relationship_end_date, #date_of_marriage, #eca_educational_issue_date, #spouse_eca_issue_date, #today_date"
  ).datepicker({
    dateFormat: "dd/mm/yy",
    autoclose: true,
    changeMonth: true,
    changeYear: true,
    todayHighlight: true,
    endDate: "0d",
    yearRange: "1950:+0",
    minViewMode: 0,
    startView: 2,
    maxDate: 0,
  });

  fetch("https://restcountries.com/v3.1/independent?status=true")
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      const selectElements = [
        "countrySelect",
        "countrySelect2",
        "spouse_citizanship",
        "spouse_current_country_residence",
        "countrySelect_spouse",
        "where_did_you_work",
        "where_did_you_travelled",
        "refused_application_country",
        "country_of_study",
      ];

      selectElements.forEach((selectId) => {
        const selectElement = document.getElementById(selectId);
        if (selectElement) {
          data.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.name.common;
            option.textContent = country.name.common;
            selectElement.appendChild(option);
          });
        }
      });
    })
    .catch((error) => console.error("Error fetching countries:", error));

  //canada statuses

  function initializeDatepicker(element) {
    element.datepicker({
      dateFormat: "dd/mm/yy",
      autoclose: true,
      changeMonth: true,
      changeYear: true,
      todayHighlight: true,
      endDate: "0d",
      minViewMode: 0,
      startView: 2,
    });
  }

  initializeDatepicker(
    $("input[name='status_start_date[]'], input[name='status_end_date[]")
  );

  $("#addMoreBtn").click(function () {
    let newRow = $(".statuses_in_canada:first").clone();

    newRow.find("input").val("");
    newRow.find("select").prop("selectedIndex", 0);

    newRow.find(".datepicker").removeClass("hasDatepicker").removeAttr("id");
    newRow.find(".error").remove();
    if (!newRow.find(".removeRow").length) {
      newRow.append(
        '<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeRow">REMOVE</button></div>'
      );
    }

    $("#canadaDetails").append(newRow);
    initializeDatePickers(newRow);
    $("input, select, textarea").on(
      "change blur",
      handleInputChange
    );
    initializeDatepicker(
      newRow.find(
        "input[name='status_start_date[]'], input[name='status_end_date[]']"
      )
    );
  });

  $(document).on("click", ".removeRow", function () {
    $(this).closest(".statuses_in_canada").remove();
  });

  $("#other_statuses_in_canada").hide();
  $("#canada_details_block").hide();
  function toggleCanadaDetails() {
    var selectedCountry = $("#countrySelect2").val();
    var selectedStatus = $("#status_in_current_country").val();
    if (selectedCountry === "Canada") {
      $("#canada_details_block").show();
    } else {
      $("#canada_details_block").hide();
      $(".status_in_canada,.status_start_date,.status_end_date").val("");
    }
    if (selectedStatus === "Citizen") {
      $("#other_statuses_in_canada").hide();
      $("#other_statuses_in_canada select input").val("");
    } else if (selectedStatus === "Other") {
      $("#other_statuses_in_canada").show();
    } else {
      $("#other_statuses_in_canada").hide();
      $("#other_statuses_in_canada textarea").val("");
      $("#other_statuses_in_canada").find("span.error").remove();
      $("#other_statuses_in_canada").next("span.error").remove();
    }
    if (selectedCountry === "Canada" && selectedStatus === "Citizen") {
      $("#other_statuses_in_canada").hide();
      $("#canada_details_block").hide();
    }
  }

  $("#countrySelect2, #status_in_current_country").on(
    "input change",
    toggleCanadaDetails
  );

  toggleCanadaDetails();

  // Marital Status

  $("#previouse_spouse_details").hide();
  $("#previouse_spouse_details_married").hide();
  $("#marital_status").change(function () {
    let maritalStatus = $(this).val();

    let showPreviousSpouseDetails = [
      "annulled-marriage",
      "divorced",
      "legally-separated",
      "widowed",
    ];

    let hideBoth = ["unknown", "single"];

    if (hideBoth.includes(maritalStatus)) {
      $("#previouse_spouse_details").hide();
      $("#previouse_spouse_details_married").hide();
      $(
        "#previouse_spouse_details_married input,#previouse_spouse_details_married select"
      ).val("");
      $("#previouse_spouse_details input,#previouse_spouse_details select").val(
        ""
      );
      $("#spouse_highest_education, #countrySelect_spouse").val("");
    } else if (showPreviousSpouseDetails.includes(maritalStatus)) {
      $("#previouse_spouse_details").show();
      $(
        "#previouse_spouse_details_married input,#previouse_spouse_details_married select"
      ).val("");
      $("#previouse_spouse_details input,#previouse_spouse_details select").val(
        ""
      );
      $("#spouse_highest_education, #countrySelect_spouse").val("");
      $("#previouse_spouse_details_married").hide();
    } else {
      $("#previouse_spouse_details").hide();
      $("#previouse_spouse_details_married").show();
      $(
        "#previouse_spouse_details_married input,#previouse_spouse_details_married select"
      ).val("");
      $("#previouse_spouse_details input,#previouse_spouse_details select").val(
        ""
      );
      $("#spouse_highest_education, #countrySelect_spouse").val("");
      $("#spouse_status_in_country_other textarea").val("");
      $(".spouse_citizanship.select2,#spouse_current_country_residence.select2")
        .val("")
        .trigger("change");
    }
  });

  $("#spouse_status_in_country_other").hide();

  $("#spouse_status_in_country").change(function () {
    if ($(this).val() === "Other") {
      $("#spouse_status_in_country_other").show();
    } else {
      $("#spouse_status_in_country_other").hide();
      $("#spouse_status_in_country_other textarea").val("");
    }
  });

  // Spouse Work Experience
  $(document).ready(function () {
    $(".canadaDetails").hide(); // Hide the section initially
    $("input[name='spouse_work_experience']").on("change", function () {
      if ($(this).val() === "Yes") {
        $(".canadaDetails").show();
      } else {
        $(".canadaDetails").hide();
        $(".canadaDetails input, .canadaDetails select").val("");
      }
    });
  });

  // spouse received an Educational Credential Assessment (ECA)
  $(document).ready(function () {
    $(".spouse_details").hide(); // Hide the section initially
    $("input[name='spouse_received_eca_educational']").on(
      "change",
      function () {
        if ($(this).val() === "Yes") {
          $(".spouse_details").show();
        } else {
          $(".spouse_details").hide();
          $(".spouse_details input, .spouse_details select").val("");
        }
      }
    );
  });

  /// Previous relationships additional

  $('input[name="previous_relationship"]').change(function () {
    if ($("#previous_relationship1").is(":checked")) {
      $("#previous_all_relationships").show();
    } else {
      $("#previous_all_relationships").hide();
      $(
        "#previous_all_relationships input, #previous_all_relationships select"
      ).val("");
    }
  });

  if ($("#previous_relationship1").is(":checked")) {
    $("#previous_all_relationships").show();
  } else {
    $("#previous_all_relationships").hide();
  }

  function initializeDatepicker(element) {
    element.datepicker({
      dateFormat: "dd/mm/yy",
      autoclose: true,
      changeMonth: true,
      changeYear: true,
      todayHighlight: true,
      endDate: "0d",
      minViewMode: 0,
      startView: 2,
    });
  }

  initializeDatepicker(
    $(
      "input[name='additional_previous_relationship_start_date[]'], input[name='additional_previous_relationship_end_date[]']"
    )
  );

  $("#addMoreRelationship").click(function () {
    let newRow = $("#additional_relationsips").first().clone();

    newRow.find("input").val("");
    newRow.find("select").prop("selectedIndex", 0);

    newRow.find(".hasDatepicker").removeClass("hasDatepicker").removeAttr("id");
    newRow.find(".error").remove();
    if (!newRow.find(".removeRelationship").length) {
      newRow.append(
        '<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeRelationship">REMOVE</button></div>'
      );
    }

    $(".additional_relationsips_append").append(newRow);
    initializeDatePickers(newRow);
    $("input, select, textarea").on(
      "change blur",
      handleInputChange
    );
    initializeDatepicker(
      newRow.find(
        "input[name='additional_previous_relationship_start_date[]'], input[name='additional_previous_relationship_end_date[]']"
      )
    );
  });

  $(document).on("click", ".removeRelationship", function () {
    $(this).closest("#additional_relationsips").remove();
  });

  // Marital Status
  $(document).ready(function () {
    $("#marital_status").change(function () {
      let val = $(this).val();
      if (
        val === "annulled-marriage" ||
        val === "divorced" ||
        val === "legally-separated" ||
        val === "single" ||
        val === "unknown" ||
        val === "widowed"
      ) {
        $("#spouse_div").hide();
      } else {
        $("#spouse_div").show();
      }
    });
  });

  $("#addMoreFamilyFriends").hide();
  //Family members
  $("#addMoreFamilyFriends").click(function () {
    let newRow = $("#family_members").first().clone();
    newRow.find("input").val("");
    newRow.find("select").prop("selectedIndex", 0);

    if (!newRow.find(".removeFamilyMember").length) {
      newRow.append(
        '<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeFamilyMember">REMOVE</button></div>'
      );
    }
    newRow.find(".error").remove();
    $("input, select, textarea").on(
      "change  blur",
      handleInputChange
    );
    $(".family_members_block_append").append(newRow);
  });

  $(document).on("click", ".removeFamilyMember", function () {
    $(this).closest("#family_members").remove();
  });

  function toggleFamilyMembersBlock() {
    if ($("#family_friends_in_canada1").is(":checked")) {
      $("#family_members_block").show();
      $("#addMoreFamilyFriends").show();
    } else {
      $("#family_members_block").hide();
      $("#addMoreFamilyFriends").hide();
      $("#family_members_block input, #family_members_block select").val("");
    }
  }

  $("input[name='family_friends_in_canada']").change(toggleFamilyMembersBlock);

  toggleFamilyMembersBlock();

  //Education details
  $("#education_field_of_study").hide();

  $('input[name="formal_education_completed"]').change(function () {
    if ($("#formal_education_completed_yes").is(":checked")) {
      $("#education_field_of_study").show();
    } else {
      $("#education_field_of_study").hide();
      $(
        "#education_field_of_study input, #education_field_of_study select"
      ).val("");
      $(".country_of_study.select2").val("").trigger("change");
    }
  });

  $("#addMoreEducation").click(function () {
    let newRow = $("#education_block").first().clone();

    newRow.find("input").val("");

    newRow.find("select").prop("selectedIndex", 0);
    newRow.find(".error").remove();
    // Remove old Select2 container if any
    newRow.find("select.select2").next(".select2-container").remove();
    if (!newRow.find(".removeEducation").length) {
      newRow.append(
        '<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeEducation">REMOVE</button></div>'
      );
    }
    $("input, select, textarea").on(
      "change blur",
      handleInputChange
    );
    $(".education_block_append").append(newRow);
    newRow.find("select.select2").select2({
      placeholder: "Select status",
      width: "100%",
      allowClear: true,
    });
  });

  $(document).on("click", ".removeEducation", function () {
    $(this).closest("#education_block").remove();
  });

  // ECA educational

  function toggleEcaBlock() {
    if ($("#eca_educational").is(":checked")) {
      $("#eca_educational_block").show();
    } else {
      $("#eca_educational_block").hide();
      $("#eca_educational_block input, #eca_educational_block select").val("");
      $("#other_eca_container textarea").val("");
    }
  }

  $("input[name='eca_educational']").change(toggleEcaBlock);

  toggleEcaBlock();

  function toggleOtherField() {
    if ($("#organization_issue_eca").val() === "other") {
      $("#other_eca_container").show();
    } else {
      $("#other_eca_container").hide();
      $("#other_eca_container textarea").val("");
    }
  }

  toggleOtherField();

  $("#organization_issue_eca").change(function () {
    toggleOtherField();
  });

  // Language test

  const detailsDiv = $("#language_test_details");
  const spouseFrenchAbilityDiv = $("#spouse_French_language_ability");
  detailsDiv.hide();
  spouseFrenchAbilityDiv.hide();
  // $("#taken_english_test_no").prop("checked", true);
  $('input[name="taken_english_test"]').change(function () {
    if ($("#taken_english_test_yes").is(":checked")) {
      detailsDiv.show();
      spouseFrenchAbilityDiv.hide();
      $("#language_test_details input, #language_test_details select").val("");
      $("#language_test_block_append select input").val("");
    } else {
      detailsDiv.hide();
      spouseFrenchAbilityDiv.show();
      $("#spouse_French_language_ability input[type='radio']").prop(
        "checked",
        false
      );
    }
  });

  const ilets_score = $(".div1, .div2, .div3, .div4");
  ilets_score.hide().find("select, input").prop("disabled", true);
  const ilets_score2 = $(".div5, .div6, .div7, .div8");
  ilets_score2.hide().find("select, input").prop("disabled", true);
  const validTests = ["ielts_general", "ielts_academic", "celpip_general"];
  const validTests2 = ["tef_canada", "tcf_canada", "pte_core"];
  $(document).on("change", ".single_lang_test", function () {
    const selectedTest = $(this).val();
    const block = $(this).closest("#language_test_block");
    block.find(".error").remove();
    const ilets_score = block.find(".div1, .div2, .div3, .div4");
    const ilets_score2 = block.find(".div5, .div6, .div7, .div8");
    ilets_score.hide().find("select, input").prop("disabled", true);
    ilets_score2.hide().find("select, input").prop("disabled", true);
    if (validTests.includes(selectedTest)) {
      ilets_score.show().find("select, input").prop("disabled", false);
    }
    if (validTests2.includes(selectedTest)) {
      ilets_score2.show().find("select, input").prop("disabled", false);
    }
  });

  const spouse_div1_4 = $(
    ".spouse_div1, .spouse_div2, .spouse_div3, .spouse_div4"
  );
  spouse_div1_4.hide().find("select").prop("disabled", true);
  const spouse_div5_8 = $(
    ".spouse_div5, .spouse_div6, .spouse_div7, .spouse_div8"
  );
  spouse_div5_8.hide().find("input").prop("disabled", true);
  const spouse_div2Tests = [
    "ielts_general",
    "ielts_academic",
    "celpip_general",
  ];
  const spouse_div2Tests2 = ["tef_canada", "tcf_canada", "pte_core"];
  $(document).on("change", ".spouse_language_test_type_val", function () {
    const selectedTest = $(this).val();
    const block = $(this).closest("#spouse_language_test_block");
    block.find(".error").remove();
    const spouse_divs = block.find(
      ".spouse_div1, .spouse_div2, .spouse_div3, .spouse_div4"
    );
    const spouse_inputs = block.find(
      ".spouse_div5, .spouse_div6, .spouse_div7, .spouse_div8"
    );
    spouse_divs.hide().find("select").prop("disabled", true);
    spouse_inputs.hide().find("input").prop("disabled", true);
    if (spouse_div2Tests.includes(selectedTest)) {
      spouse_divs.show().find("select").prop("disabled", false);
    }

    if (spouse_div2Tests2.includes(selectedTest)) {
      spouse_inputs.show().find("input").prop("disabled", false);
    }
  });

  initializeDatepicker(
    $("input[name='language_test_date[]'], input[name='language_result_date[]")
  );

  $("#addMoreLanguageTest").click(function () {
    let newBlock = $("#language_test_block").first().clone();
    newBlock.find(".div1, .div2, .div3, .div4").hide();
    newBlock.find("input").val("");
    newBlock.find("select").prop("selectedIndex", 0);

    newBlock
      .find(".hasDatepicker")
      .removeClass("hasDatepicker")
      .removeAttr("id");
    newBlock.find(".error").remove();
    if (!newBlock.find(".removeLanguageTest").length) {
      newBlock.append(
        '<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeLanguageTest">REMOVE</button></div>'
      );
    }
    $(".language_test_block_append").append(newBlock);
    initializeDatePickers(newBlock);
    $("input, select, textarea").on(
      "change blur",
      handleInputChange
    );
    initializeDatepicker(
      newBlock.find(
        "input[name='language_test_date[]'], input[name='language_result_date[]']"
      )
    );
  });

  $(document).on("click", ".removeLanguageTest", function () {
    $(this).closest("#language_test_block").remove();
  });

  // Spouse Language test

  const spouseDetailsDiv = $("#spouse_language_test_details");

  const spouseLangAbility = $("#spouse_language_ability");

  spouseDetailsDiv.hide();
  spouseLangAbility.hide();
  // $("#spouse_taken_english_test_no").prop("checked", true);

  $('input[name="spouse_language_test_taken"]').change(function () {
    if ($("#spouse_taken_english_test_yes").is(":checked")) {
      spouseDetailsDiv.show();
      spouseLangAbility.hide();
      $(
        "#spouse_language_test_details input, #spouse_language_test_details select"
      ).val("");
    } else {
      spouseDetailsDiv.hide();
      spouseLangAbility.show();
      $("#spouse_language_ability input[type='radio']").prop("checked", false);
    }
  });

  initializeDatepicker(
    $(
      "input[name='spouse_language_test_date[]'], input[name='spouse_language_result_date[]"
    )
  );

  $("#addMoreSpouseLanguageTest").click(function () {
    let newBlock = $("#spouse_language_test_block").first().clone();
    newBlock
      .find(".spouse_div5, .spouse_div6, .spouse_div7, .spouse_div8")
      .hide();
    newBlock.find("input").val("");
    newBlock.find("select").prop("selectedIndex", 0);

    newBlock
      .find(".hasDatepicker")
      .removeClass("hasDatepicker")
      .removeAttr("id");
    newBlock.find(".error").remove();
    if (!newBlock.find(".removeLanguageTest").length) {
      newBlock.append(
        '<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeSpouseLanguageTest">REMOVE</button></div>'
      );
    }
    $(".spouse_language_test_block_append").append(newBlock);
    initializeDatePickers(newBlock);
    $("input, select, textarea").on(
      "change blur",
      handleInputChange
    );
    initializeDatepicker(
      newBlock.find(
        "input[name='spouse_language_test_date[]'], input[name='spouse_language_result_date[]']"
      )
    );
  });

  $(document).on("click", ".removeSpouseLanguageTest", function () {
    $(this).closest("#spouse_language_test_block").remove();
  });

  //Company details

  initializeDatepicker(
    $(
      "input[name='first_working_date[]'], input[name='last_working_date[]'], input[name='where_did_you_work_status_start_date[]'], input[name='where_did_you_work_status_end_date[]']"
    )
  );

  // Employment History multiple radio val
  function employmentdetailsradio(selectedValue) {
    return selectedValue;
  }
  // EmploymentHistory append div with remove
  $("#addMoreCompany").click(function () {
    let newBlock = $("#company_details_block").first().clone();
    newBlock.addClass("company-details-block"); // Add class for easier removal
    newBlock.find("input,textarea").val("");
    newBlock.find("select").prop("selectedIndex", 0);
    newBlock.find("input[type='radio']").prop("checked", false);
    newBlock.find("input[type='radio']").first().prop("checked", true);

    let uniqueId = new Date().getTime();
    newBlock.find("input[type='radio']").each(function (index) {
      let selectedValue = newBlock.find("input[type='radio']:checked").val();
      console.log("inside" + selectedValue);
      let oldName = $(this).attr("name");
      let newName = oldName + "_" + uniqueId; // Make the name unique
      $(this).attr("name", newName);
      if (index === 0) {
        $(this).val("yes");
      } else {
        $(this).val("no");
      }
    });
    newBlock.find(".error").remove();
    newBlock.find("input").removeClass("hasDatepicker").removeAttr("id");
    // Remove old Select2 container if any
    newBlock.find("select.select2").next(".select2-container").remove();
    if (!newBlock.find(".EmploymentHistory").length) {
      newBlock.append(
        '<div class="col-12 mt-2"><button type="button" class="btn btn-danger EmploymentHistory">REMOVE</button></div>'
      );
    }
    $("#employment_history").append(newBlock);

    // Reinitialize Select2 only on the new select(s)
    newBlock.find("select.select2").select2({
      placeholder: "Select status",
      width: "100%",
      allowClear: true,
    });
    // Append an <hr> line after the newly added company details block
    newBlock.after('<hr class="company-divider">');

    // **Ensure LastWorkingDaydiv exists before hiding**
    if (newBlock.find(".LastWorkingDaydiv").length > 0) {
      setTimeout(function () {
        newBlock.find(".LastWorkingDaydiv").hide();
      }, 10);
    }

    // Attach event listener to dynamically added radio buttons
    newBlock.find(".currently_working_in_companys").change(function () {
      toggleLastWorkingDateField($(this));
    });

    newBlock.find("input[type='radio']").on("change", function () {
      let selectedValue = newBlock.find("input[type='radio']:checked").val();
      let Multipleradioval = employmentdetailsradio(selectedValue);
      $("#employmentRadioVal").val(Multipleradioval);
    });
    let selectedRadio = newBlock.find(".currently_working_in_companys:checked");
    toggleLastWorkingDateField(selectedRadio);
    initializeDatePickers(newBlock);
    toggleLastWorkingDateField(newBlock);
    initializeDatepicker(
      newBlock.find(
        "input[name='first_working_date[]'], input[name='last_working_date[]'], input[name='where_did_you_work_status_start_date[]'], input[name='where_did_you_work_status_end_date[]']"
      )
    );
  });

  // Remove the block
  $(document).on("click", ".EmploymentHistory", function () {
    let block = $(this).closest(".company-details-block");
    block.next("hr.company-divider").remove(); // Remove the <hr> line next to the block
    block.remove(); // Remove the block itself
  });

  $(".LastWorkingDaydiv").hide();
  function toggleLastWorkingDateField(element) {
    var sel = element.val();
    var parentBlock = element.closest(".company_details_block");
    var lastWorkingDateField = parentBlock.find(".LastWorkingDaydiv");

    if (sel === "yes") {
      lastWorkingDateField.hide();
      lastWorkingDateField.find("input,textarea").val(""); // Clear input field properly
    } else {
      lastWorkingDateField.show();
    }
  }
  $(document).on("change", ".currently_working_in_companys", function () {
    toggleLastWorkingDateField($(this));
  });

  // Travelled History

  $("#travelled_history").hide();
  $("input[name='travelled_country']").change(function () {
    if ($(this).val() === "Yes") {
      $("#travelled_history").show();
    } else {
      $("#travelled_history").hide();
      $("#travelled_history select").val("");
      $(".where_did_you_travelled.select2").val("").trigger("change");
    }
  });

  // Immigration History Section

  $("#immegration_applications").hide();

  $("input[name='submitted_immegration_application']").change(function () {
    if ($(this).val() === "Yes") {
      $("#immegration_applications").show();
    } else {
      $("#immegration_applications").hide();
      $("#immegration_applications select").val("");
      $("#immegration_applications input[type='radio']").prop("checked", false);
    }
  });

  $("#refused_details").hide();

  $("input[name='refused_immegration_applications']").change(function () {
    if ($(this).val() === "Yes") {
      $("#refused_details").show();
    } else {
      $("#refused_details").hide();
      $("#refused_details select,#refused_details input").val("");
      $("#refused_application_country.select2").val("").trigger("change");
    }
  });

  $("#addMoreTravelleHistory").click(function () {
    let newBlock = $("#travelled_history_block").first().clone();

    newBlock.find("select").val("");
    newBlock.find(".error").remove();
    newBlock.find("select.select2").next(".select2-container").remove();
    if (newBlock.find(".remove-travel-record").length === 0) {
      newBlock.append(
        '<div class="col-12 mt-2"><button type="button" class="remove-travel-record btn btn-danger mt-3">Remove</button></div>'
      );
    }
    $(".travelled_history_block_append").append(newBlock);
    // Reinitialize Select2 only on the new select(s)
    newBlock.find("select.select2").select2({
      placeholder: "Select status",
      width: "100%",
      allowClear: true,
    });
  });

  $(document).on("click", ".remove-travel-record", function () {
    $(this).closest("#travelled_history_block").remove();
  });

  //Immegration APPLICATIONS

  handleOtherApplicationDisplay($("#immegration_applications_row"));

  function handleOtherApplicationDisplay(container) {
    container.find(".immegration_application_type").on("change", function () {
      const selectedValue = $(this).val();
      const otherDetails = $(this)
        .closest(".row")
        .find(".other-application-details");
      if (selectedValue === "Other") {
        otherDetails.show();
      } else {
        otherDetails.hide();
        otherDetails.val("");
      }
    });
  }

  $("#addMoreImmegrationApplications").on("click", function () {
    let newApplicationBlock = $("#immegration_applications_row")
      .first()
      .clone();

    let uniqueId = new Date().getTime();
    newApplicationBlock.find(".error").remove();
    newApplicationBlock.find("input[type='radio']").each(function () {
      let oldName = $(this).attr("name");
      let newName = oldName + "_" + uniqueId;
      $(this).attr("name", newName);
    });

    // Reset all input/select/textarea values
    newApplicationBlock.find("select").val("");
    newApplicationBlock.find("textarea").val("");
    newApplicationBlock.find("input[type='radio']").prop("checked", false);
    newApplicationBlock.find(".other-application-details").hide();

    if (!newApplicationBlock.find(".removeImmegrationApplication").length) {
      newApplicationBlock.append(
        '<div class="col-12 mt-2"><button type="button" class="removeImmegrationApplication btn btn-danger mt-3">Remove</button></div>'
      );
    }

    $(".immegration_applications_append").append(newApplicationBlock);
    handleOtherApplicationDisplay(newApplicationBlock); // Attach change listener
  });

  $(document).on("click", ".removeImmegrationApplication", function () {
    $(this).closest(".row").remove();
  });

  //Immegration refused applications

  $("#addMoreRefusedApplications").on("click", function () {
    let newRefusedBlock = $("#refused_immegration_block").first().clone();

    newRefusedBlock.find("input, select").val("");
    newRefusedBlock.find(".error").remove();
    newRefusedBlock.find("select.select2").next(".select2-container").remove();
    if (!newRefusedBlock.find(".removeRefusedApplication").length) {
      newRefusedBlock.append(
        '<div class="col-12 mt-2"><button type="button" class="removeRefusedApplication btn btn-danger mt-3">Remove</button></div>'
      );
    }
    newRefusedBlock.find("select.select2").select2({
      placeholder: "Select status",
      width: "100%",
      allowClear: true,
    });

    $(".refused_immegration_block_append").append(newRefusedBlock);
  });

  $(document).on("click", ".removeRefusedApplication", function () {
    $(this).closest("#refused_immegration_block").remove();
  });

  //Referral

  $("#referrals").hide();
  $("#other_referral_text").hide();

  $("input[name='referred_by']").change(function () {
    if ($(this).val() === "Referred by a friend or family member") {
      $("#referrals").show();
    } else {
      $("#other_referral_text").hide();
      $("#referrals").hide();
      $("#referrals input").val("");
    }

    if ($(this).val() === "Other") {
      $("#referrals").hide();
      $("#other_referral_text").show();
    } else {
      $("#other_referral_text").hide();
      $("#other_referral_text textarea").val("");
    }
  });

  $("#addMoreReferrals").click(function () {
    let newReferralBlock = $("#referral_block").first().clone();
    newReferralBlock.find("input, textarea").val("");
    newReferralBlock.append(
      '<div class="col-12 mt-2"><button type="button" class="removeReferral btn btn-danger mt-2">Remove</button></div>'
    );
    $("#zr-form-detail-referral").append(newReferralBlock);
    newReferralBlock.find(".error").remove();
  });

  $(document).on("click", ".removeReferral", function () {
    $(this).closest("#referral_block").remove();
  });

  $("#company_details").hide();
  $(document).on("click", ".emp1", function () {
    $val = $(this).val();
    if ($val === "Yes") {
      $("#company_details").show();
    } else {
      $("#company_details").hide();
      $("#company_details input, #company_details select ,#company_details textarea").val("");
      $(".where_did_you_work.select2").val("").trigger("change");
    }
  });
});
