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
    let marital_status = $("select[name='marital_status']").val();
    let previous_relationship = $("input[name='previous_relationship']:checked").val();
    let family_freind =  $("input[name='family_friends_in_canada']:checked").val(); 
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
        $("input[name='phone']").after("<span class='error' style='color: red;'>Enter a valid  phone number.</span>");
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
        $("select[name='citizanship_nationality']").after("<span class='error' style='color: red;'>This field is required.</span>");
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
        $("select[name='country']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    // status in current country validation
    if (status_in_current_country === "") {
        $("select[name='status_in_current_country']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }

    if(status_in_current_country === "Other"){
        let otherStatus = $("textarea[name='other_statuses_in_canada']").val().trim();
        let status_in_current_country_error = $("textarea[name='other_statuses_in_canada']").parent(); 
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
        commonvalidation2();
    }
    // Validation for  common-law
    if (marital_status === 'common-law') {
        commonvalidation();
    }

    // Validation for  conjugal
    if (marital_status === 'conjugal') {
        commonvalidation();
    }

    // Validation for  conjugal
    if (marital_status === 'married-not-present') {
        commonvalidation();
    }

    // Validation for  divorced
    if (marital_status === 'divorced') {
        commonvalidation2();
    }

    // Validation for  legally-separated
    if (marital_status === 'legally-separated') {
        commonvalidation2();
    }

    // Validation for married
    if (marital_status === 'married') {
        commonvalidation();
    }
    // Validation for married-present
    if (marital_status === 'married-present') {
        commonvalidation();
    }
    // Validation for widowed
    if (marital_status === 'widowed') {
        commonvalidation2();
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
                if ($(this).val().trim() === "") {
                    $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                    isValid = false;
                }
            });
       
            $(".additional_previous_relationship_type").each(function () {
                if ($(this).val().trim() === "") {
                    $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                    isValid = false;
                }
            });
    
            $(".additional_previous_relationship_start_date").each(function () {
                if ($(this).val().trim() === "") {
                    $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                    isValid = false;
                }
            });
    
            $(".additional_previous_relationship_end_date").each(function () {
                if ($(this).val().trim() === "") {
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
    let spouse_english_language_ability =  $("input[name='spouse_english_language_ability']:checked").val();
    let spouse_french_language_ability =  $("input[name='spouse_french_language_ability']:checked").val();
    let spouse_organization_issued_eca = $("select[name='spouse_organization_issued_eca']").val();
    let spouse_canadian_equivalency = $("input[name='spouse_canadian_equivalency']").val();
    let spouse_eca_issue_date = $("input[name='spouse_eca_issue_date']").val();
    let spouse_received_eca_educational = $("input[name='spouse_received_eca_educational']:checked").val();
    
    
    let formal_education = $("input[name='formal_education_completed']").parent().parent(); 
     // Clear previous errors
     $(".error").remove();
    if (!formal_education_completed) {
        if (formal_education.next(".error").length === 0) { 
            formal_education.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }
    // if radio button select yes Family/Friends in Canada validation
    if(formal_education_completed === 'yes') {
        $(".level_of_education_completed").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".education_year_completed").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".education_duration").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".education_field_of_study").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });

        $(".country_of_study").each(function () {
            if ($(this).val().trim() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
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

        $(".eca_educational_other").each(function () {
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
    }
    // Taken English Test validation
    let taken_english_test_error = $("input[name='taken_english_test']").parent().parent(); 
    if (!taken_english_test) {
        if (taken_english_test_error.next(".error").length === 0) { 
            taken_english_test_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }
    if(taken_english_test === 'Yes'){
        past_test_taken();
    }
    // Spouse Highest Education validation
    if (spouse_highest_education === "") {
        $("input[name='spouse_highest_education']").after("<span class='error' style='color: red;'>This field is required.</span>");
        isValid = false;
    }
    // Spouse Country of Study validation
    if (spouse_country_of_study === "") {
        $("select[name='spouse_country_of_study']").after("<span class='error' style='color: red;'>This field is required.</span>");
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
    // Spouse Language Test Taken  validation
    let spouse_language_test_taken_error = $("input[name='spouse_language_test_taken']").parent().parent(); 
    if (!spouse_language_test_taken) {
        if (spouse_language_test_taken_error.next(".error").length === 0) { 
            spouse_language_test_taken_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }
// If Select yes Spouse Language Test Taken  validation
if(spouse_french_language_ability === "Yes"){
    past_test_taken();
}else{
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
return isValid;
}   
function validateForm3(){
    let isValid = true;
    let employed_before = $("input[name='employed_before']:checked").val();
    // Employed Before validation
    let employed_before_error = $("input[name='employed_before']").parent().parent(); 
    $(".error").remove();
    if (!employed_before) {
        if (employed_before_error.next(".error").length === 0) { 
            employed_before_error.after("<span class='error' style='color: red;'>This field is required.</span>");
        }
        isValid = false;
    }

    if( employed_before === "yes"){
        // // Emplopye Details validation
        $(".company_name,.occupation,.job_description,.first_working_date,.last_working_date,.where_did_you_work,.where_did_you_work_status_start_date,.where_did_you_work_status_end_date,.noc_code,.job_duties").each(function () {
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        })
        // Employment History page radio button validation
        $(".empdetails").each(function () {
            let radioGroup = $(this).find("input[type='radio']");
            if (radioGroup.filter(":checked").length === 0) {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
    }
        return isValid;
        
}
function validateForm4(){
    let isValid = true;
    let AdmissibilityradioGroups = ["submitted_immegration_application","refused_immegration_applications","have_you_ever_stayed","unauthorized_work_of_study","serious_diseases","served_in_govt_job","handcuffs_detained_by_police","charged_with_impaired_driving","immigration_matter_would_you_like_to_discuss"]; 
    let travelled_country = $("input[name='travelled_country']:checked").val();
    $(".error").remove();
    // Travelled Country validation
    if(travelled_country ==="yes"){
        $(".where_did_you_travelled, .travelled_year").each(function () {
            // Remove existing error before adding a new one
            $(this).next(".error").remove(); 
            if ($(this).val() === "") {
                $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
                isValid = false;
            }
        });
    }
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
    $("#refused_application_country,#refused_application_type,#year_of_refusal").each(function () {
        if ($(this).val() === "") {
            $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
    })
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
function past_test_taken(){
    $(".language_test_type, .cerficate_number, .language_test_date, .language_result_date, .listening_score, .speaking_score, .reading_score, .writing_score, .clb_equivalent").each(function () {
        // Remove existing error before adding a new one
        $(this).next(".error").remove(); 
        if ($(this).val().trim() === "") {
            $(this).after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
    });
}
function commonvalidation(){
    //    let isValid = true;
    // // Clear previous error messages
    //     $(".error").remove();
        let spouse_name = $("input[name='spouse_name']").val();
        let spouse_age  = $("input[name='spouse_age']").val();
        let spouse_gender   = $("select[name='spouse_gender']").val();
        let spouse_citizanship   = $("select[name='spouse_citizanship']").val();
        let date_of_marriage   = $("input[name='date_of_marriage']").val();
        let spouse_current_country_residence   = $("select[name='spouse_current_country_residence']").val();
        let spouse_status_in_country   = $("select[name='spouse_status_in_country']").val();
        if (spouse_name=== "") {
            $("input[name='spouse_name']").after("<span class='error' style='color: red;'>This field is required.</span>");
            isValid = false;
        }
        if (spouse_age=== "") {
            $("input[name='spouse_age']").after("<span class='error' style='color: red;'> Please enter a valid age.</span>");
            isValid = false;
        }
        if (spouse_gender === "") {
            $("select[name='spouse_gender']").after("<span class='error' style='color: red;'> This field is required.</span>");
            isValid = false;
        }
        if (spouse_citizanship === "") {
            $("select[name='spouse_citizanship']").after("<span class='error' style='color: red;'> This field is required.</span>");
            isValid = false;
        }
        if (date_of_marriage === "") {
            $("input[name='date_of_marriage']").after("<span class='error' style='color: red;'> This field is required.</span>");
            isValid = false;
        }
        if (spouse_current_country_residence === "") {
            $("select[name='spouse_current_country_residence']").after("<span class='error' style='color: red;'> This field is required.</span>");
            isValid = false;
        }
        if (spouse_status_in_country === "") {
            $("select[name='spouse_status_in_country']").after("<span class='error' style='color: red;'> This field is required.</span>");
            isValid = false;
        }
        // return isValid;
}
function commonvalidation2(){
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
}