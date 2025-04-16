function validateForm1() {
    let isValid = true;
    let name = $("input[name='full_name']").val();
    let email = $("input[name='email']").val();
    let phone = $("input[name='phone']").val();
    let date_of_birth = $("input[name='date_of_birth']").val();
    let gender = $("select[name='gender']").val();
    let Citizenship = $("select[name='citizanship_nationality']").val();
    let street_address = $("input[name='street_address']").val();
    let apartment = $("input[name='apartment']").val();
    let current_city = $("input[name='current_city']").val();
    let state_province_territory = $("input[name='state_province_territory']").val();
    let zipcode = $("input[name='zipcode']").val();
    let country = $("select[name='country']").val();
    let status_in_current_country = $("select[name='status_in_current_country']").val();
    let previous_relationship = $("input[name='previous_relationship']:checked").val();
    let family_freind =  $("input[name='family_friends_in_canada']:checked").val();
    let redidential_country = $(".redidential_country").val();
    let marital_status = $("select[name='marital_status']").val();
    // Regular expression for email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous errors
     $(".error").remove();

    // Name validation
    if (name === "") {
        $("input[name='full_name']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // Email validation
    if (email === "") {
        $("input[name='email']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        $("input[name='email']").after("<span class='error' style='color: red;'>Enter a valid email.</span>");
        isValid = false;
    }

    //  phone validation
    if (phone === "") {
        $("input[name='phone']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }else if(phone.length < 10){
        $("input[name='phone']").after("<span class='error' style='color: red;'>Enter a valid  phone number.</span>");
        isValid = false;
    }


    //  Date_of Birth validation
    if (date_of_birth === "") {
        $("input[name='date_of_birth']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // gender validation
    if (gender === "") {
        $("select[name='gender']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }
    // Citizenship validation
    if (Citizenship === "") {
        $("select[name='citizanship_nationality']").next('.select2-container').after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // Citizenship validation
    if (street_address === "") {
        $("input[name='street_address']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // apartment validation
    if (apartment === "") {
        $("input[name='apartment']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // city validation
    if (current_city === "") {
        $("input[name='current_city']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // state validation
    if (state_province_territory === "") {
        $("input[name='state_province_territory']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // zipcode validation
    if (zipcode === "") {
        $("input[name='zipcode']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // country validation
    if (country === "") {
        $("select[name='country']").next('.select2-container').after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // status in current country validation
    if (status_in_current_country === "") {
        $("select[name='status_in_current_country']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    if(status_in_current_country === "Other"){
        let otherStatus = $("textarea[name='other_statuses_in_canada']").val().trim();
        let status_in_current_country_error = $("textarea[name='other_statuses_in_canada']"); 
        if (otherStatus === "") {
            if (status_in_current_country_error.next(".error").length === 0) { 
                status_in_current_country_error.after("<span class='error' style='color: red;'>This field is required.</span>");
            }
            isValid = false;
        }
    }
    // marital status validation
    if (marital_status === "") {
        $("select[name='marital_status']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }
    // Validation for  annulled-marriage
    if (marital_status === 'annulled-marriage') {
        if (! commonvalidation2()) {
            return false;
        };
    }
    // Validation for  common-law
    if (marital_status === 'common-law') {
        if (!commonvalidation()) {
            return false;
        }
    }

    // Validation for  conjugal
    if (marital_status === 'conjugal') {
        if (!commonvalidation()) {
            return false;
        }
    }

    // Validation for  conjugal
    if (marital_status === 'married-not-present') {
        if (!commonvalidation()) {
            return false;
        };
    }

    // Validation for  divorced
    if (marital_status === 'divorced') {
        if (!commonvalidation2()) {
            return false;
        }
    }

    // Validation for  legally-separated
    if (marital_status === 'legally-separated') {
        if (!commonvalidation2()) {
            return false;
        }
    }

    // Validation for married
    if (marital_status === 'married') {
        if (!commonvalidation()) {
            return false;
        }
    }
    // Validation for married-present
    if (marital_status === 'married-present') {
        if (!commonvalidation()) {
            return false;
        }
    }
    // Validation for widowed
    if (marital_status === 'widowed') {
        if (!commonvalidation2()) {
            return false;
        }
    }
    
    // Current Residential Address validation
    if(redidential_country === "Canada"){
        $(".statuses_in_canada").each(function () {
            const container = $(this);
            const status = container.find(".status_in_canada");
            const startDate = container.find(".status_start_date");
            const endDate = container.find(".status_end_date");

            // Check each field
            [status, startDate, endDate].forEach(function (field) {
                if ($.trim(field.val()) === "") {
                    field.after("<span class='error' style='color: red;'>This field is required.</span>");
                    isValid = false;
                }
            });
        });
    }
        
    // previous relationship validation
    let radioContainer = $("input[name='previous_relationship']").parent().parent(); 
    if (!previous_relationship) {
        if (radioContainer.next(".error").length === 0) { 
            radioContainer.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }

    // if radio button select yes in relatioship
    if (previous_relationship === "Yes") {
        $(".additional_previous_relationship_name").each(function () {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
    
        $(".additional_previous_relationship_type").each(function () {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".additional_previous_relationship_start_date").each(function () {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".additional_previous_relationship_end_date").each(function () {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });    
    }


    // Family/Friends in Canada validation
    let family_friends_in_canada = $("input[name='family_friends_in_canada']").parent().parent(); 
    if (!family_freind) {
        if (family_friends_in_canada.next(".error").length === 0) { 
            family_friends_in_canada.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }

    // if radio button select yes in family freind
    if (family_freind === "Yes") {
        $(".family_friends_relationship_type").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
    
        $(".family_friends_city").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".family_friends_province").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
       
    }

    return isValid;
}

function validateForm2(){
    let isValid = true;
    let formal_education_completed =  $("input[name='formal_education_completed']:checked").val();
    let eca_educational =  $("input[name='eca_educational']:checked").val();
    let taken_english_test =  $("input[name='taken_english_test']:checked").val();
    let spouse_highest_education = $("input[name='spouse_highest_education']").val();
    let spouse_country_of_study = $("select[name='spouse_country_of_study']").val();
    let spouse_work_experience =  $("input[name='spouse_work_experience']:checked").val();
    let spouse_work_experience_canada = $("input[name='spouse_work_experience_canada']").val();
    let spouse_work_experience_outside_canada = $("input[name='spouse_work_experience_outside_canada']").val();
    let spouse_language_test_taken =  $("input[name='spouse_language_test_taken']:checked").val();
    let spouse_organization_issued_eca = $("select[name='spouse_organization_issued_eca']").val();
    let spouse_canadian_equivalency = $("input[name='spouse_canadian_equivalency']").val();
    let spouse_eca_issue_date = $("input[name='spouse_eca_issue_date']").val();
    let spouse_received_eca_educational = $("input[name='spouse_received_eca_educational']:checked").val();
    let marital_status = $("#marital_status").val();
    let formal_education = $("input[name='formal_education_completed']").parent().parent(); 
     // Clear previous errors
     $(".error").remove();
    if (!formal_education_completed) {
        if (formal_education.next(".error").length === 0) { 
            formal_education.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }

    if ($("input[name='taken_english_test']:checked").length === 0) {
        if ($("input[name='taken_english_test']").next(".error").length === 0) {
            $("input[name='taken_english_test']").parent().parent().after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        return false; 
    }
    // if radio button select yes Family/Friends in Canada validation
    if(formal_education_completed === 'Yes') {
        $(".level_of_education_completed,.education_field_of_study,.education_year_completed,.education_duration").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".country_of_study").each(function () {
            if ($(this).val().trim() === "") {
                $(this).next('.select2-container').after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
    }   
    
    
    // ECA validation
    let eca_educational_error = $("input[name='eca_educational']").parent().parent(); 
    if (!eca_educational) {
        if (eca_educational_error.next(".error").length === 0) { 
            eca_educational_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }
    // If radio button Yes ECA validation
    if(eca_educational === 'Yes'){
        $(".organization_issue_eca").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".eca_equivalency").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".eca_educational_issue_date").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
        let other = $("select[name='organization_issue_eca']").val();
        if(other === 'other'){
            let otherInputValue = $("textarea[name='eca_educational_other']").val(); 
            if (otherInputValue === "") {
                $("textarea[name='eca_educational_other']").after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        }
    }
    // Taken English Test validation
    let taken_english_test_error = $("input[name='taken_english_test']").parent().parent(); 
    if (!taken_english_test) {
        if (taken_english_test_error.next(".error").length === 0) { 
            taken_english_test_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }
    if (taken_english_test === 'Yes') {
        $(".single_lang_test").each(function (index) {
            const testType = $(this).val();
            const block = $(this).closest("#language_test_block");
            $(this).next(".error").remove();
            if (!testType) {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
            
            const scoreFields = {
                "ielts_general": [".div1", ".div2", ".div3", ".div4"],
                "ielts_academic": [".div1", ".div2", ".div3", ".div4"],
                "celpip_general": [".div1", ".div2", ".div3", ".div4"],
                "tef_canada": [".div5", ".div6", ".div7", ".div8"],
                "tcf_canada": [".div5", ".div6", ".div7", ".div8"],
                "pte_core": [".div5", ".div6", ".div7", ".div8"]
            };
    
            const relevantDivs = scoreFields[testType];
            if (relevantDivs) {
                relevantDivs.forEach(function (divClass) {
                    const input = block.find(divClass).find("input, select");
                    input.next(".error").remove();
                    if (!input.val()) {
                        input.after("<span class='error' style='color: red;'>This field is required.</span>");
                        isValid = false;
                    }
                });
            }
        });    
    }else{
        let english_language_ability =  $("input[name='english_language_ability']:checked").val();
        let french_language_ability =  $("input[name='french_language_ability']:checked").val();
        let english_language_ability_error = $("input[name='english_language_ability']").parent().parent(); 
        if (!english_language_ability) {
            if (english_language_ability_error.next(".error").length === 0) { 
                english_language_ability_error.after("<span class='error' style='color: red;'>This field is required.</span>");
            }
            isValid = false;
        }
        let french_language_ability_error = $("input[name='french_language_ability']").parent().parent(); 
        if (!french_language_ability) {
            if (french_language_ability_error.next(".error").length === 0) { 
                french_language_ability_error.after("<span class='error' style='color: red;'>This field is required.</span>");
            }
            isValid = false;
        }
    }
    
    let marital_status_val = $("#marital_status_1").val();
    if(marital_status_val === "married-present" ||  
        marital_status_val === "married-not-present" ||
        marital_status_val === "married" ||  
        marital_status_val === "conjugal" || 
        marital_status_val === "common-law" ){

            // Spouse Highest Education validation
    if (spouse_highest_education === "") {
        $("input[name='spouse_highest_education']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }
    // Spouse Country of Study validation
    if (spouse_country_of_study === "") {
        $("select[name='spouse_country_of_study']").next('.select2-container').after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }
    
    // Spouse Work Experience validation
    let spouse_work_experience_error = $("input[name='spouse_work_experience']").parent().parent(); 
    if (!spouse_work_experience) {
        if (spouse_work_experience_error.next(".error").length === 0) { 
            spouse_work_experience_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }

    // Spouse Work Experience validation in case Yes
    if(spouse_work_experience === "Yes"){
      // Spouse Work Experience Canada validation
        if (spouse_work_experience_canada === "") {
            $("input[name='spouse_work_experience_canada']").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
        // Spouse Work Experience Outside Canada validation
        if (spouse_work_experience_outside_canada === "") {
            $("input[name='spouse_work_experience_outside_canada']").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
    }
    
    // Spouse Language Test Taken  validation
    let spouse_language_test_taken_error = $("input[name='spouse_language_test_taken']").parent().parent(); 
    if (!spouse_language_test_taken) {
        if (spouse_language_test_taken_error.next(".error").length === 0) { 
            spouse_language_test_taken_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }
    // If Select yes Spouse Language Test Taken  validation
    if(spouse_language_test_taken === "Yes"){
        $(".spouse_language_test_type_val").each(function (index) {
            const testType = $(this).val();
            const block = $(this).closest("#spouse_language_test_block");
            $(this).next(".error").remove();
            if (!testType) {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
            
            const scoreFields = {
                "ielts_general": [".spouse_div1", ".spouse_div2", ".spouse_div3", ".spouse_div4"],
                "ielts_academic": [".spouse_div1", ".spouse_div2", ".spouse_div3", ".spouse_div4"],
                "celpip_general": [".spouse_div1", ".spouse_div2", ".spouse_div3", ".spouse_div4"],
                "tef_canada": [".spouse_div5", ".spouse_div6", ".spouse_div7", ".spouse_div8"],
                "tcf_canada": [".spouse_div5", ".spouse_div6", ".spouse_div7", ".spouse_div8"],
                "pte_core": [".spouse_div5", ".spouse_div6", ".spouse_div7", ".spouse_div8"]
            };
    
            const relevantDivs = scoreFields[testType];
            if (relevantDivs) {
                relevantDivs.forEach(function (divClass) {
                    const input = block.find(divClass).find("input, select");
                    input.next(".error").remove();
                    if (!input.val()) {
                        input.after("<span class='error' style='color: red;'>This field is required.</span>");
                        isValid = false;
                    }
                });
            }
        });   
    }else{
        let spouse_english_language_ability =  $("input[name='spouse_english_language_ability']:checked").val();
        let spouse_french_language_ability =  $("input[name='spouse_french_language_ability']:checked").val();
        let spouse_english_language_ability_error = $("input[name='spouse_english_language_ability']").parent().parent(); 
        if (!spouse_english_language_ability) {
            if (spouse_english_language_ability_error.next(".error").length === 0) { 
                spouse_english_language_ability_error.after("<span class='error' style='color: red;'>This field is required.</span>");
            }
            isValid = false;
        }
        let spouse_french_language_ability_error = $("input[name='spouse_french_language_ability']").parent().parent(); 
        if (!spouse_french_language_ability) {
            if (spouse_french_language_ability_error.next(".error").length === 0) { 
                spouse_french_language_ability_error.after("<span class='error' style='color: red;'>This field is required.</span>");
            }
            isValid = false;
        }
    }
// Spouse Received Eca Educational validation
    let spouse_received_eca_educational_error = $("input[name='spouse_received_eca_educational']").parent().parent(); 
    if (!spouse_received_eca_educational) {
        if (spouse_received_eca_educational_error.next(".error").length === 0) { 
            spouse_received_eca_educational_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }
    
    if(spouse_received_eca_educational === "Yes"){
        // Spouse Organization Issued Eca validation
        if (spouse_organization_issued_eca === "") {
            $("select[name='spouse_organization_issued_eca']").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
        // Spouse Canadian Equivalency validation
        if (spouse_canadian_equivalency === "") {
            $("input[name='spouse_canadian_equivalency']").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
        // Spouse Eca Issue Date validation
        if (spouse_eca_issue_date === "") {
            $("input[name='spouse_eca_issue_date']").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
    }
}

    return isValid;
    }   
function validateForm3(){
    let isValid = true;
    let employed_before = $("input[name='employed_before']:checked").val();
    let currently_working_in_company = $("input[name='currently_working_in_company[]']:checked").val();
    let Multipleradioval = $("#employmentRadioVal").val();
    $(".error").remove();

    // Employed Before validation
    let employed_before_error = $("input[name='employed_before']").parent().parent(); 
    if (!employed_before) {
        if (employed_before_error.next(".error").length === 0) { 
            employed_before_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }
    
    if( employed_before === "Yes"){
        // Emplopye Details validation
        $(".company_name, .occupation, .job_description, .first_working_date,.where_did_you_work_status, .where_did_you_work_status_start_date, .where_did_you_work_status_end_date, .noc_code, .job_duties").each(function() {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".where_did_you_work").each(function() {
            if ($(this).val() === "") {
                $(this).next('.select2-container').after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
        
        // If "no" is selected, check last working date
        if (currently_working_in_company === "no" || Multipleradioval === "no") {
            $(".last_working_date:visible").each(function () {
                if ($(this).val().trim() === "") {
                    $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                    isValid = false;
                }
            });
        }
        
    }
        return isValid;
        
}
function validateForm4(){
    let isValid = true;
    let emailPatterns = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let AdmissibilityradioGroups = ["have_you_ever_stayed","unauthorized_work_of_study","serious_diseases","served_in_govt_job","handcuffs_detained_by_police","charged_with_impaired_driving","immigration_matter_would_you_like_to_discuss"]; 
    let travelled_country = $("input[name='travelled_country']:checked").val();
    let submitted_immegration_application =  $("input[name='submitted_immegration_application']:checked").val(); 
    let refused_immegration_applications =  $("input[name='refused_immegration_applications']:checked").val(); 
    let referred_by_other =  $("#referred_by_other").val();
    let selectedType = $("select[name='immegration_application_type[]']").val();
    $(".error").remove();
    // **Checkbox Validation**
    let consentCheckbox = $("#flexCheckDefault");
    let formCheckDiv = consentCheckbox.closest(".form-check");

    if (!consentCheckbox.is(":checked")) {
        if (formCheckDiv.next(".checkbox").length === 0) {
            alert('1');
            formCheckDiv.after("<span class='checkbox' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }

    // Submitted Immegration Application Validation

    let submitted_immegration_application_error = $("input[name='submitted_immegration_application']").parent().parent(); 
    if (!submitted_immegration_application) {
        if (submitted_immegration_application_error.next(".error").length === 0) { 
            submitted_immegration_application_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }

    if(submitted_immegration_application==="Yes"){
        // Provide Immigration Application Details Validition
        $(".immegration_application_type,.immegration_application_submission_year").each(function () {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        })
        // Admissibility/Misc page radio button validation
        $(".decision-group").each(function () {
            let radioGroup = $(this).find("input[type='radio']");
            if (radioGroup.filter(":checked").length === 0) {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        if(selectedType ==="other"){
            let otherField = $("textarea[name='immegration_application_other[]']");
            otherField.each(function () {
            $(this).next(".error").remove(); 
                if ($(this).val() === "") {
                    $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                    isValid = false;
                }
            });
        }
    }

    // Refused Immegration Applications Validation
    let refused_immegration_applications_error = $("input[name='refused_immegration_applications']").parent().parent(); 
    if (!refused_immegration_applications) {
        if (refused_immegration_applications_error.next(".error").length === 0) { 
            refused_immegration_applications_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }

    if(refused_immegration_applications ==="Yes"){
        $("#refused_application_type,#year_of_refusal").each(function () {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        })
        $("#refused_application_country").each(function () {
            if ($(this).val() === "") {
                $(this).next('.select2-container').after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        })
    }
    // Travelled Country validation
    if(travelled_country ==="Yes"){
        $(".where_did_you_travelled").each(function () {
            $(this).next(".error").remove(); 
                if ($(this).val() === "") {
                    $(this).next('.select2-container').after("<span class='error' style='color: red;'>This field is required.</span>");
                    isValid = false;
                }
        });
        $(".travelled_year").each(function () {
            $(this).next(".error").remove(); 
                if ($(this).val() === "") {
                    $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                    isValid = false;
                }
        });
    }
    
    // Referred By Validation
    let referred_by_error = $("input[name='referred_by']").parent().parent().parent(); 
    let referred_by =  $("input[name='referred_by']:checked").val(); 
    
    if (!referred_by) {
        if (referred_by_error.next(".error").length === 0) { 
            referred_by_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }

    // Referred by a friend or family member
    if(referred_by === "Referred by a friend or family member"){
        $(".error").remove();
        $(".referral_name,.referral_code,.textrefer").each(function () {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        })
        $(".referral_phone").each(function () {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }else if ($(this).val().length < 10){
                $(this).after("<span class='error' style='color: red;'>Enter a valid  phone number.</span>");
                isValid = false;
            }
        })
        $(".referral_email").each(function () {
            let referral_email = $(this).val().trim();
            
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }else if (!emailPatterns.test(referral_email)){
                $(this).after("<span class='error' style='color: red;'>Enter a valid  email.</span>");
                isValid = false;
            }
        })
    }
    // Referred by other
    if(referred_by === "Other"){
        if (referred_by_other === "") {
            $("#referred_by_other").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
    }
    
    $(".liquid_assets_in_canadian_dollar,.net_worth_in_canadian_dollar,.moveable_assets,.immovable_assets,.exampleFormControlTextarea1,.today_date,.full_legal_name").each(function () {
        if ($(this).val() === "") {
            $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
    })
       // Admissibility radio button validation
       AdmissibilityradioGroups.forEach(groupName => {
        let selectedOption = $(`input[name='${groupName}']:checked`);
        let parentElement = $(`input[name='${groupName}']`).parent().parent();

        // Remove existing error messages before validation
        parentElement.next(".error").remove();

        if (selectedOption.length === 0) {
            parentElement.after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
    });
    return isValid;
}
function commonvalidation(){
        let isValid = true;
        let spouse_status_in_country   = $("select[name='spouse_status_in_country']").val();
        let spouse_status_in_country_other = $("textarea[name='spouse_status_in_country_other']").val();
        
        $("select[name='spouse_current_country_residence'],select[name='spouse_citizanship']").each(function () {
            if ($(this).val().trim() === "") {
                $(this).next('.select2-container').after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
        if(spouse_status_in_country === "Other" && spouse_status_in_country_other === ""){
            $("textarea[name='spouse_status_in_country_other']").after("<span class='error' style='color: red;'> This field is required.</span>");
            isValid = false;
        }
        $("input[name='spouse_name'],input[name='spouse_age'],select[name='spouse_gender'],input[name='date_of_marriage'],select[name='spouse_status_in_country']").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
        return isValid;
}
function commonvalidation2(){
        let isValid = true;
        let previous_spouse_name = $("input[name='previous_spouse_name']").val();
        let relationship_start_date = $("#relationship_start_date").val();
        let relationship_end_date = $("#relationship_end_date").val(); 
        if (previous_spouse_name === "") {
            $("input[name='previous_spouse_name']").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
        if (relationship_start_date === "") {
            $("#relationship_start_date").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
        if (relationship_end_date === "") {
            $("#relationship_end_date").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
        return isValid;
}