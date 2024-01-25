const parentFormStepMap = {
  1: "USER_EMAIL",
  2: "PROFESSIONAL_INFO_FORM",
  3: "SKILLS_INFO_FORM",
  4: "PAYMENT_INFO_FORM",
};

const formNamesArray = [
  "Email",
  "Professional Information",
  "Skills Information",
  "Payment",
];

const formNameStepMap = {
  Email: 1,
  "Professional Information": 2,
  "Skills Information": 3,
  Payment: 4,
};

class FormInputTypeShape {
  constructor(
    type = "",
    labelName = "",
    placeholder = "",
    isRequired = false,
    isDropdown = false,
    optionList = [],
    parentFormStep = 0,
    isDataList = false,
    defaultValue = ""
  ) {
    this.type = type;
    this.labelName = labelName;
    this.placeholder = placeholder;
    this.isRequired = isRequired;
    this.isDropdown = isDropdown;
    this.optionList = optionList;
    this.parentFormStep = parentFormStep;
    this.labelId = labelName.replaceAll(/\W/g, "").toLowerCase();
    this.isDataList = isDataList;
    this.defaultValue = defaultValue;
  }
}

const formInputType = {
  TEXT: "TEXT_INPUT_FIELD",
  DROPDOWN_INPUT: "DROPDOWN_INPUT",
  DATALIST: "DATALIST",
};

const PersonalInfoFormData = [
  new FormInputTypeShape(
    formInputType.TEXT_INPUT_FIELD,
    "Email",
    "Enter your email",
    true,
    false,
    [],
    1
  ),
  new FormInputTypeShape(
    formInputType.TEXT_INPUT_FIELD,
    "Name",
    "Enter your full name",
    true,
    false,
    [],
    1
  ),
  new FormInputTypeShape(
    formInputType.TEXT_INPUT_FIELD,
    "Phone Number",
    "Enter your active phone number",
    true,
    false,
    [],
    1
  ),
  new FormInputTypeShape(
    formInputType.DATALIST,
    "Location",
    "Enter your current location",
    false,
    false,
    [],
    0,
    true
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Current Professional Status",
    "What are you doing right now?",
    false,
    true,
    ["Employed", "Student", "Student + Employed", "Others"],
    2
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Which college you are from?",
    "Looking for a job right now?",
    false,
    true,
    [
      "LNCT",
      "JNCT",
      "Oriental",
      "TIT",
      "People's",
      "NRI",
      "Truba",
      "Bansal",
      "Radha Raman",
      "IES",
      "BSSS",
      "SIRT",
      "SISTec",
      "Trinity",
      "Extol",
      "SAM",
      "MANIT",
      "UIT",
      "RKDF",
      "MITTAL",
      "Others",
    ],
    2
  ),

  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "What's a good salary that can motivate you to accept a job offer?",
    "Salary?",
    false,
    true,
    [
      "0 - 3 LPA",
      "3 - 5 LPA",
      "5 - 7 LPA",
      "7 - 9 LPA",
      "9 - 12 LPA",
      "Above 12 LPA",
    ]
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Select your Course",
    "Course",
    false,
    true,
    [
      "B.Tech",
      "B.E",
      "B.C.A",
      "B.A",
      "B.Sc",
      "B.Com",
      "B.Pharma",
      "M.Sc",
      "M.Tech",
      "M.B.B.S",
      "Others",
    ]
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Select your Course year",
    "Branch",
    false,
    true,
    ["1st", "2nd", "3rd", "4th"]
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Select your relevant Branch",
    "Branch",
    false,
    true,
    ["C.S", "C.E", "M.E", "E.C", "E.X", "Others"]
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "You would attend the classes online or offline?",
    "Looking for a job right now?",
    false,
    true,
    ["Offline At Indrapuri Center", "Online"],
    2
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Select your preferred batch",
    "Batch-code",
    false,
    true,
    ["WMB2 - Starting - 29 jan 2024"],
    0,
    false,
    "WMB2 - Starting - 29 jan 2024"
  ),
  // new FormInputTypeShape(
  //   formInputType.TEXT_INPUT_FIELD,
  //   "Otp",
  //   "Enter otp sent on your email address",
  //   true,
  //   false,
  //   [],
  //   1
  // ),
];

const ProfessionalInfoFormData = [
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Current Professional Status",
    "What are you doing right now?",
    true,
    true,
    [
      "Full-time Employed",
      "Full-time Student",
      "Student + Employed",
      "Not Student, Not Employed",
    ],
    2
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "You're available for full-time opportunities from",
    "Given a job offer, how soon you can join for full-time?",
    false,
    true,
    ["Immediately", "In 2 - 4 weeks", "Later than 4 weeks"],
    2
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Your last drawn salary?",
    "Enter your active phone number",
    true,
    true,
    [
      "None",
      "0 - 3 lpa",
      "3 - 6 lpa",
      "6 - 9 lpa",
      "9 - 12 lpa",
      "More than 12 lpa",
    ],
    2
  ),
];

const SkillsInfoFormData = [
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "How much experience do you have working with Git?",
    "",
    true,
    true,
    ["None", "1 year", "2 years", "3 Years", "4 Years", "More than 5 Years"],
    3
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "How much experience do you have working with JavaScript?",
    "",
    true,
    true,
    ["None", "1 year", "2 years", "3 Years", "4 Years", "More than 5 Years"],
    3
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "How much experience do you have working with TypeScript?",
    "",
    false,
    true,
    ["None", "1 year", "2 years", "3 Years", "4 Years", "More than 5 Years"],
    3
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "How much experience do you have working with HTML and CSS?",
    "",
    true,
    true,
    ["None", "1 year", "2 years", "3 Years", "4 Years", "More than 5 Years"],
    3
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "How much experience do you have working with ReactJS?",
    "",
    true,
    true,
    ["None", "1 year", "2 years", "3 Years", "4 Years", "More than 5 Years"],
    3
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "How much experience do you have working with NodeJS?",
    "",
    false,
    true,
    ["None", "1 year", "2 years", "3 Years", "4 Years", "More than 5 Years"],
    3
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "How much experience do you have working with Cloud (AWS/GCP/Azure)?",
    "",
    false,
    true,
    ["None", "1 year", "2 years", "3 Years", "4 Years", "More than 5 Years"],
    3
  ),
];

const PaymentsInfoFormData = [
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "The program requires you to attend live classes of around 10 hrs/week. Do you have the time resources to do that?",
    "This program is very competitve",
    false,
    true,
    ["Yes", "No"],
    4
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Select a course you want to register for",
    "Reach out to us if you're not sure",
    true,
    true,
    [
      "Frontend Developer Course",
      "Backend Developer Course",
      "Full Stack Developer Course",
    ],
    4
  ),
  new FormInputTypeShape(
    formInputType.DROPDOWN_INPUT,
    "Coupon",
    "Coupon",
    false,
    false,
    [],
    4
  ),
];

const parentFormsByName = {
  USER_EMAIL: PersonalInfoFormData,
  PROFESSIONAL_INFO_FORM: ProfessionalInfoFormData,
  SKILLS_INFO_FORM: SkillsInfoFormData,
  PAYMENT_INFO_FORM: PaymentsInfoFormData,
};

// Don't delete this::::::::::
// const objectKeysFoBackend = {
//   Email,
//   Name,
//   PhoneNumber,

//   CurrentProfessinalStatus,
//   Youreavailableforfulltimeopportunitiesfrom,
//   Yourlastdrawnsalary,

//   HowmuchexperiencedoyouhaveworkingwithCloudAWSGCPAzure,
//   HowmuchexperiencedoyouhaveworkingwithGit,
//   HowmuchexperiencedoyouhaveworkingwithHTMLandCSS,
//   HowmuchexperiencedoyouhaveworkingwithJavaScript,
//   HowmuchexperiencedoyouhaveworkingwithNodeJS,
//   HowmuchexperiencedoyouhaveworkingwithReactJS,
//   HowmuchexperiencedoyouhaveworkingwithTypeScript,

//   Selectacourseyouwanttoregisterfor,
//   Theprogramrequiresyoutoattendliveclassesofaround10hrsweekDoyouhavethetimeresourcestodothat,
// };

export {
  parentFormsByName,
  parentFormStepMap,
  formNameStepMap,
  formNamesArray,
};
