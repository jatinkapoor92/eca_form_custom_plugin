
$(document).ready(function() {
   // Previous Button
   $(".previous").click(function() {
    if (animating) return false;
    animating = true;
    current_fs = $(this).closest("fieldset");
    previous_fs = current_fs.prev("fieldset");
    $(".zr-progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    previous_fs.fadeIn();
    current_fs.fadeOut(function() {
        animating = false;
    });
});
  var current_fs, next_fs, previous_fs;
  var animating;
  // Save & Next Button
  $(".save-next").click(function() {
    current_fs = $(this).closest("fieldset");
    next_fs = current_fs.next("fieldset");
    var formData = current_fs.find("input, select, textarea, radio").serialize();
    var formDataObj = {};
    // get feildset value
    formData.split('&').forEach(function(item) {
        var parts = item.split('=');
        formDataObj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
    });
    // Check validation conditions
    // if (formDataObj['fieldset'] == 1) {
    //     if (!validateForm1()) {
    //         return false;
    //     }
    // }
    // else if (formDataObj['fieldset'] == 2) {
    //   if (!validateForm2()) {
    //       return false;
    //   }
    // }
    // else if (formDataObj['fieldset'] == 3) {
    //   if (!validateForm3()) {
    //       return false;
    //   }
    // }
    // else if (formDataObj['fieldset'] == 4) {
    //   if (!validateForm4()) {
    //       return false;
    //   }
    // }

    // try {
    //   $.ajax({
    //       url: "http://127.0.0.1:8000/api/leads/customcode", // API endpoint
    //       type: "POST",
    //       header : "Content-Type: application/json",
    //       data: formData,
    //       success: function(response) {
    //         $(".marital_status").val(response.lead.marital_status);
    //           // Move to next fieldset if submission is successful
    //           if (response.lead && response.lead.id) {
    //               // Append the ID to the hidden input field
    //               $("input[name='lead_id']").val(response.lead.id);
    //           }
    //           $(".zr-progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    //           next_fs.fadeIn();
    //           current_fs.fadeOut(function() {
    //               animating = false;
    //           });
    //       },
    //       error: function(xhr, status, error) {
    //           console.log("Error:", error);
    //           animating = false;
    //       }
    //   });
    // } catch (error) {
    //   console.error("Try-Catch Error:", error.message);
    // }

      if (animating) return false;
      animating = true;
      $(".zr-progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
      next_fs.fadeIn();
      current_fs.fadeOut(function() {
          animating = false;
      });
     
  });
});

// Employment History Perivious date disabled First Working Day
$(document).ready(function () {
  $(".first_working_date").datepicker({
      dateFormat: "dd/mm/yy",
      changeMonth: true,
      changeYear: true,
      onSelect: function (selectedDate) {
          var minDate = $(this).datepicker("getDate"); // Get selected date
          $(".last_working_date").datepicker("option", "minDate", minDate); // Set minDate for last working date
      }
  });

  $(".last_working_date").datepicker({
      dateFormat: "dd/mm/yy",
      changeMonth: true,
      changeYear: true,
  });
});

// Employment History Perivious date disabled Status Start Date 
$(document).ready(function () {
  $(".where_did_you_work_status_start_date").datepicker({
      dateFormat: "dd/mm/yy",
      changeMonth: true,
      changeYear: true,
      onSelect: function (selectedDate) {
          var minDate = $(this).datepicker("getDate"); // Get selected date
          $(".where_did_you_work_status_end_date").datepicker("option", "minDate", minDate); // Set minDate for last working date
      }
  });

  $(".where_did_you_work_status_end_date").datepicker({
      dateFormat: "dd/mm/yy",
      changeMonth: true,
      changeYear: true,
  });
});


document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// 

document.getElementById("countrySelect").addEventListener("change", function () {
var selectedCountry = this.value;
var canadaForm = document.getElementById("canadaDetails");

if (selectedCountry === "Canada") {
    canadaForm.style.display = "block"; 
} else {
    canadaForm.style.display = "none"; 
}
});



$(document).ready(function () {
    var phoneInput = document.querySelector("#phone");
    var iti = window.intlTelInput(phoneInput, {
        initialCountry: "ca",
        preferredCountries: ["us", "ca", "gb"],
        separateDialCode: true,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js"
    });

    var phoneInputReferral = document.querySelectorAll('[name="referral_phone[]"]');

    phoneInputReferral.forEach(function(input) {
        window.intlTelInput(input, {
            initialCountry: "ca",
            preferredCountries: ["us", "ca", "gb"],
            separateDialCode: true,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.19/build/js/utils.js"
        });
    });
    



    $(".iti__country-list").attr("tabindex", "-1");

    setTimeout(function () {
        $('.selectpicker').selectpicker();
    }, 500);


    $("#dob, #relationship_start_date, #relationship_end_date, #date_of_marriage, #eca_educational_issue_date, #spouse_eca_issue_date, #today_date").datepicker({
        dateFormat: "dd/mm/yy",
        autoclose: true,
        changeMonth: true,
        changeYear: true, 
        todayHighlight: true,
        endDate: "0d",
        minViewMode: 0,
        startView: 2
    });
    

    

    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  
      const selectElements = ["countrySelect", "countrySelect2", "spouse_citizanship", "spouse_current_country_residence", "countrySelect_spouse", "where_did_you_work", "where_did_you_travelled", "refused_application_country", "country_of_study"];
  
      selectElements.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        if (selectElement) {
          data.forEach(country => {
            const option = document.createElement("option");
            option.value = country.name.common;
            option.textContent = country.name.common;
            selectElement.appendChild(option);
          });
        }
      });
    })
    .catch(error => console.error("Error fetching countries:", error));
    

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
            startView: 2
        });
    }
    
    initializeDatepicker($("input[name='status_start_date[]'], input[name='status_end_date[]"));

    $(".addMoreBtn").click(function() {
      
        let newRow = $(".statuses_in_canada:first").clone();

        newRow.find("input").val("");
        newRow.find("select").prop("selectedIndex", 0);

        newRow.find(".datepicker").removeClass("hasDatepicker").removeAttr("id");

        if (!newRow.find(".removeRow").length) {
            newRow.append('<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeRow">REMOVE</button></div>');
        }

        $("#canadaDetails").append(newRow);

        initializeDatepicker(newRow.find("input[name='status_start_date[]'], input[name='status_end_date[]']"));
    });

    $(document).on("click", ".removeRow", function() {
        $(this).closest(".statuses_in_canada").remove();
    });
    
    function toggleCanadaDetails() {
        var selectedCountry = $("#countrySelect2").val();
        var selectedStatus = $("#status_in_current_country").val();
        console.log("selectedCountry:", selectedCountry);
        console.log("selectedStatus:", selectedStatus);
        if (selectedCountry === "Canada" && selectedStatus !== "citizen" && selectedStatus !== "Other") {
            $("#canada_details_block").show();
            $("#other_statuses_in_canada").hide();
        } else if(selectedStatus === "Other"){
            $("#other_statuses_in_canada").show();
            $("#canada_details_block").hide();
        }
        else{
            $("#other_statuses_in_canada").hide();
            $("#canada_details_block").hide();
        }
    }
    
    $("#countrySelect2, #status_in_current_country").on("input change", toggleCanadaDetails);
    
    toggleCanadaDetails();
    
    // Marital Status

    $('#previouse_spouse_details').hide();
    $('#previouse_spouse_details_married').hide();
    $('#marital_status').change(function () {
        let maritalStatus = $(this).val();

        let showPreviousSpouseDetails = [
            'annulled-marriage', 'divorced', 'legally-separated', 'widowed'
        ];
        
        let hideBoth = ['unknown', 'single'];

        if (hideBoth.includes(maritalStatus)) {
            $('#previouse_spouse_details').hide();
            $('#previouse_spouse_details_married').hide();
        } else if (showPreviousSpouseDetails.includes(maritalStatus)) {
            $('#previouse_spouse_details').show();
            $('#previouse_spouse_details_married').hide();
        } else {
            $('#previouse_spouse_details').hide();
            $('#previouse_spouse_details_married').show();
        }
    });

    $("#spouse_status_in_country_other").hide();

    $("#spouse_status_in_country").change(function () {
      if ($(this).val() === "Other") {
        $("#spouse_status_in_country_other").show();
      } else {
        $("#spouse_status_in_country_other").hide();
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
          }
      });
    });

    // spouse received an Educational Credential Assessment (ECA)
    $(document).ready(function () {
      $(".spouse_details").hide(); // Hide the section initially
      $("input[name='spouse_received_eca_educational']").on("change", function () {
          if ($(this).val() === "Yes") {
              $(".spouse_details").show();
          } else {
              $(".spouse_details").hide();
          }
      });
    });
  

    /// Previous relationships additional


    $('input[name="previous_relationship"]').change(function () {
        if ($('#previous_relationship1').is(':checked')) {
          $('#previous_all_relationships').show();
        } else {
          $('#previous_all_relationships').hide();
        }
      });
  
      if ($('#previous_relationship1').is(':checked')) {
        $('#previous_all_relationships').show();
      } else {
        $('#previous_all_relationships').hide();
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
            startView: 2
        });
    }
    
    initializeDatepicker($("input[name='additional_previous_relationship_start_date[]'], input[name='additional_previous_relationship_end_date[]']"));
    
    $("#addMoreRelationship").click(function() {
        let newRow = $("#additional_relationsips").first().clone();
    
        newRow.find("input").val("");
        newRow.find("select").prop("selectedIndex", 0);
    
        newRow.find(".hasDatepicker").removeClass("hasDatepicker").removeAttr("id");
    
        if (!newRow.find(".removeRelationship").length) {
            newRow.append('<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeRelationship">REMOVE</button></div>');
        }
    
        $("#additional_relationsips").after(newRow);
    
        initializeDatepicker(newRow.find("input[name='additional_previous_relationship_start_date[]'], input[name='additional_previous_relationship_end_date[]']"));
    });
    
    $(document).on("click", ".removeRelationship", function() {
        $(this).closest("#additional_relationsips").remove();
    });

    // Marital Status
    $(document).ready(function(){
      $("#marital_status").change(function(){
        let val = $(this).val();
        if(val === "annulled-marriage" ||  val === "divorced" || val === "legally-separated" || val === "single" ||val === "unknown" || val === "widowed" ){
          $("#spouse_div").hide();
        }else{
          $("#spouse_div").show();
        }
      });
    });

    //Family members
    $("#addMoreFamilyFriends").click(function () {
        let newRow = $("#family_members").first().clone();

        newRow.find("input").val("");
        newRow.find("select").prop("selectedIndex", 0);

        if (!newRow.find(".removeFamilyMember").length) {
            newRow.append('<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeFamilyMember">REMOVE</button></div>');
        }

        $("#family_members").after(newRow);
    });

    $(document).on("click", ".removeFamilyMember", function () {
        $(this).closest("#family_members").remove();
    });

    function toggleFamilyMembersBlock() {
        if ($("#family_friends_in_canada1").is(":checked")) {
          $("#family_members_block").show();
        } else {
          $("#family_members_block").hide();
        }
      }
  
      $("input[name='family_friends_in_canada']").change(toggleFamilyMembersBlock);
  
      toggleFamilyMembersBlock();

      //Education details
      $('#education_field_of_study').hide();

      $('input[name="formal_education_completed"]').change(function() {
        if ($('#formal_education_completed_yes').is(':checked')) {
          $('#education_field_of_study').show();
        } else {
          $('#education_field_of_study').hide();
        }
      });

      $("#addMoreEducation").click(function() {
            let newRow = $("#education_block").first().clone();

            newRow.find("input").val("");

            newRow.find("select").prop("selectedIndex", 0);

            if (!newRow.find(".removeEducation").length) {
                newRow.append('<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeEducation">REMOVE</button></div>');
            }

            $("#education_block").last().after(newRow);
        });

        $(document).on("click", ".removeEducation", function() {
            $(this).closest("#education_block").remove();
        });


        // ECA educational

        function toggleEcaBlock() {
            if ($("#eca_educational").is(":checked")) {
              $("#eca_educational_block").show();
            } else {
              $("#eca_educational_block").hide();
            }
          }
      
          $("input[name='eca_educational']").change(toggleEcaBlock);
      
          toggleEcaBlock();

        function toggleOtherField() {
            if ($("#organization_issue_eca").val() === "other") {
              $("#other_eca_container").show();
            } else {
              $("#other_eca_container").hide();
            }
          }
      
          toggleOtherField();
      
          $("#organization_issue_eca").change(function () {
            toggleOtherField();
          });


    // Language test

        const detailsDiv = $("#language_test_details");

        detailsDiv.hide();
        $("#taken_english_test_no").prop("checked", true);

        $('input[name="taken_english_test"]').change(function () {
        if ($("#taken_english_test_yes").is(":checked")) {
            detailsDiv.show();
        } else {
            detailsDiv.hide();
        }
        });

        initializeDatepicker($("input[name='language_test_date[]'], input[name='language_result_date[]"));

        $("#addMoreLanguageTest").click(function () {
            let newBlock = $("#language_test_block").first().clone();
    
            newBlock.find("input").val("");
            newBlock.find("select").prop("selectedIndex", 0);
    
            newBlock.find(".hasDatepicker").removeClass("hasDatepicker").removeAttr("id");
    
            if (!newBlock.find(".removeLanguageTest").length) {
                newBlock.append('<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeLanguageTest">REMOVE</button></div>');
            }
            $("#language_test_block").last().after(newBlock);
    
            initializeDatepicker(newBlock.find("input[name='language_test_date[]'], input[name='language_result_date[]']"));
        });
    
        $(document).on("click", ".removeLanguageTest", function () {
            $(this).closest("#language_test_block").remove();
        });


        
    // Spouse Language test

  const spouseDetailsDiv = $("#spouse_language_test_details");

  const spouseLangAbility = $("#spouse_language_ability");

        spouseDetailsDiv.hide();
        spouseLangAbility.show();
        $("#spouse_taken_english_test_no").prop("checked", true);

        $('input[name="spouse_language_test_taken"]').change(function () {
        if ($("#spouse_taken_english_test_yes").is(":checked")) {
            spouseDetailsDiv.show();
            spouseLangAbility.hide();
        } else {
            spouseDetailsDiv.hide();
            spouseLangAbility.show();
        }
        });

        initializeDatepicker($("input[name='spouse_language_test_date[]'], input[name='spouse_language_result_date[]"));

        $("#addMoreSpouseLanguageTest").click(function () {
            let newBlock = $("#spouse_language_test_block").first().clone();
    
            newBlock.find("input").val("");
            newBlock.find("select").prop("selectedIndex", 0);
    
            newBlock.find(".hasDatepicker").removeClass("hasDatepicker").removeAttr("id");
    
            if (!newBlock.find(".removeLanguageTest").length) {
                newBlock.append('<div class="col-12 mt-2"><button type="button" class="btn btn-danger removeSpouseLanguageTest">REMOVE</button></div>');
            }
            $("#spouse_language_test_block").last().after(newBlock);
    
            initializeDatepicker(newBlock.find("input[name='spouse_language_test_date[]'], input[name='spouse_language_result_date[]']"));
        });
    
        $(document).on("click", ".removeSpouseLanguageTest", function () {
            $(this).closest("#spouse_language_test_block").remove();
        });


        //Company details

        initializeDatepicker($("input[name='first_working_date[]'], input[name='last_working_date[]'], input[name='where_did_you_work_status_start_date[]'], input[name='where_did_you_work_status_end_date[]']"));

        // EmploymentHistory append div with remove
        $("#addMoreCompany").click(function () {
            let newBlock = $("#company_details_block").first().clone();
            newBlock.addClass("company-details-block"); // Add class for easier removal
            newBlock.find("input").val("");
            newBlock.find("select").prop("selectedIndex", 0);
            newBlock.find("input[type='radio']").prop("checked", false);
            newBlock.find("input[type='radio']").first().prop("checked", true);
        
            let uniqueId = new Date().getTime();
            newBlock.find("input[type='radio']").each(function () {
                let oldName = $(this).attr("name");
                let newName = oldName + "_" + uniqueId; // Make the name unique
                $(this).attr("name", newName);
            });
            newBlock.find("input").removeClass("hasDatepicker").removeAttr("id");
        
            if (!newBlock.find(".EmploymentHistory").length) {
              newBlock.append('<div class="col-12 mt-2"><button type="button" class="btn btn-danger EmploymentHistory">REMOVE</button></div>');
          }
            $("#employment_history").append(newBlock);
            // Append an <hr> line after the newly added company details block
            newBlock.after('<hr class="company-divider">');

            initializeDatepicker(newBlock.find("input[name='first_working_date[]'], input[name='last_working_date[]'], input[name='where_did_you_work_status_start_date[]'], input[name='where_did_you_work_status_end_date[]']"));
        });
        
        // Remove the block 
          $(document).on("click", ".EmploymentHistory", function () {
              let block = $(this).closest(".company-details-block");
              block.next("hr.company-divider").remove(); // Remove the <hr> line next to the block
              block.remove(); // Remove the block itself
          });
    
          $(".LastWorkingDaydiv").hide();
          $(document).on("change", ".currently_working_in_companys", function () {
            var parentBlock = $(this).closest(".company_details_block");
            var lastWorkingDateField = parentBlock.find(".LastWorkingDaydiv");
        
            if ($(this).val() === "yes") {
                lastWorkingDateField.closest(".col-lg-4").hide();
                lastWorkingDateField.val('');
            } else {
                lastWorkingDateField.closest(".col-lg-4").show();
            }
        });
          
        // Travelled History

        $("#travelled_history").hide();

        $("input[name='travelled_country']").change(function () {
          if ($(this).val() === "yes") {
            $("#travelled_history").show();
          } else {
            $("#travelled_history").hide();
          }
        });


        // Immigration History Section

        $("#immegration_applications").hide();

        $("input[name='submitted_immegration_application']").change(function () {
          if ($(this).val() === "yes") {
            $("#immegration_applications").show();
          } else {
            $("#immegration_applications").hide();
          }
        });

        $("#refused_details").hide();

        $("input[name='refused_immegration_applications']").change(function () {
          if ($(this).val() === "yes") {
            $("#refused_details").show();
          } else {
            $("#refused_details").hide();
          }
        });
      
        $("#addMoreTravelleHistory").click(function () {
          let newBlock = $("#travelled_history_block").first().clone();
      
          newBlock.find("select").val("");
      
          if (newBlock.find(".remove-travel-record").length === 0) {
            newBlock.append('<div class="col-12 mt-2"><button type="button" class="remove-travel-record btn btn-danger mt-3">Remove</button></div>');
          }      
          $("#travelled_history_block").last().after(newBlock);
        });
      
        $(document).on("click", ".remove-travel-record", function () {
          $(this).closest("#travelled_history_block").remove();
        });



        //Immegration APPLICATIONS 

        function toggleOtherTextArea(container) {
            const select = container.find('select[name="immegration_application_type[]"]');
            const otherTextArea = container.find("#immegration_application_other").closest(".form-group");
        
            if (select.val() === "other") {
              otherTextArea.show();
            } else {
              otherTextArea.hide();
            }
          }
        
          toggleOtherTextArea($("#immegration_applications"));
        
          $(document).on("change", 'select[name="immegration_application_type[]"]', function () {
            toggleOtherTextArea($(this).closest("#immegration_applications"));
          });
        
          $("#addMoreImmegrationApplications").on("click", function () {
            let newApplicationBlock = $("#immegration_applications_row").first().clone();
        
            newApplicationBlock.find("input, select, textarea").val("");
        
            let uniqueId = new Date().getTime();
        
            newApplicationBlock.find("input[type='radio']").each(function () {
              let newName = "decision_" + uniqueId;
              $(this).attr("name", newName);
            });
        
            if (!newApplicationBlock.find(".removeImmegrationApplication").length) {
              newApplicationBlock.append('<button type="button" class="removeImmegrationApplication btn btn-danger mt-3">Remove</button>');
            }
        
            $("#immegration_applications_row").last().after(newApplicationBlock);
          });
        
          $(document).on("click", ".removeImmegrationApplication", function () {
            $(this).closest("#immegration_applications_row").remove();
          });



        //Immegration refused applications


        $("#addMoreRefusedApplications").on("click", function () {
            let newRefusedBlock = $("#refused_immegration_block").first().clone();
    
            newRefusedBlock.find("input, select").val("");
    
            if (!newRefusedBlock.find(".removeRefusedApplication").length) {
                newRefusedBlock.append('<button type="button" class="removeRefusedApplication btn btn-danger mt-3">Remove</button>');
            }
    
            $("#refused_immegration_block").last().after(newRefusedBlock);
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
          }

          if ($(this).val() === "Other") {
            $("#referrals").hide();
            $("#other_referral_text").show();
          } else {
            $("#other_referral_text").hide();
          }

        });

        $("#addMoreReferrals").click(function () {
            let newReferralBlock = $("#referral_block").first().clone();
            newReferralBlock.find("input, textarea").val("");
            newReferralBlock.append('<button type="button" class="removeReferral btn btn-danger mt-2">Remove</button>');
            $("#zr-form-detail-referral").append(newReferralBlock);
        });
    
        $(document).on("click", ".removeReferral", function () {
            $(this).closest("#referral_block").remove();
        });

        $("#company_details").hide();
        $(document).on("click", ".emp1", function () {
          $val = $(this).val();
          if( $val === "yes"){
             $("#company_details").show();
          }else{
            $("#company_details").hide();
          }
        });
        

});