export const DocumentTypes = {
  1: "Photo Identity Proof",
  2: "Address Proof",
  3: "Income Proof",
  4: "Signature Proof",
  5: "Academic Certificates",
  6: "Bank Statement Proof",
  7: "Miscellaneous"
};

export const TypesSubTypes = {
  1: [1, 2, 12, 5],
  2: [2, 3, 4, 5, 6, 8, 7],
  3: [9, 10, 11, 8],
  4: [4, 1, 5],
  6: [6, 8],
  7: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
};

export const DocumentSubTypes = {
  0: "Document",
  1: "Pan Card",
  2: "Aadhaar Card",
  3: "Ration Card",
  4: "Passport",
  5: "Driving License",
  6: "Bank E-Statement",
  7: "Electricity Bill",
  8: "Passbook",
  9: "ITR",
  10: "Salary Slip",
  11: "Registration Certificate of Business for Self-Employed",
  12: "Voters Identity Card",
  21: "Insta Aadhaar",
  22: "Insta Aadhaar Log",
  23: "Insta Aadhaar XML",
  24: "Insta Pan Log",
  25: "OSV",
  26: "Cibil XML",
  27: "Downpayment Receipt",
  28: "CAM Report",
  29: "ENach Form",
  30: "Other Documents"
};

export const DocumentSubTypesMeta = [
  {
    Id: 0,
    label: "Document",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 1,
    label: "Pan Card",
    Front: true,
    Back: true,
    Multiple: false,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 2,
    label: "Aadhaar Card",
    Front: true,
    Back: true,
    Multiple: false,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 3,
    label: "Ration Card",
    Front: true,
    Back: true,
    Multiple: false,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 4,
    label: "Passport",
    Front: true,
    Back: true,
    Multiple: false,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 5,
    label: "Driving License",
    Front: true,
    Back: true,
    Multiple: false,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 6,
    label: "Bank E-Statement",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 7,
    label: "Electricity Bill",
    Front: true,
    Back: false,
    Multiple: false,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 8,
    label: "Passbook Photo/Scans",
    Front: true,
    Back: true,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 9,
    label: "ITR",
    Front: true,
    Back: false,
    Multiple: false,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 10,
    label: "Salary Slip",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 11,
    label: "Registration Certificate of Business for Self-Employed",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 12,
    label: "Voters Identity Card",
    Front: true,
    Back: true,
    Multiple: false,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 21,
    label: "Insta Aadhaar",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 22,
    label: "Insta Aadhaar log",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 23,
    label: "Insta Aadhaar XML",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 24,
    label: "Insta Pan Log",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 25,
    label: "OSV",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 26,
    label: "Cibil XML",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 27,
    label: "Downpayment Receipt",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 28,
    label: "CAM Report",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 29,
    label: "ENach Form",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  },
  {
    Id: 30,
    label: "Other Documents",
    Front: false,
    Back: false,
    Multiple: true,
    Accept: [
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/png",
      "application/pdf"
    ]
  }
];

export const Banks = [
  { value: "ABHYUDAYA_CO_OP_BANK", label: "Abhyudaya Co-op. Bank Ltd" },
  {
    value: "ADARSH_CO_OPERATIVE_URBAN_BANK",
    label: "Adarsh Co Op Urban Bank"
  },
  { value: "ADINATH_CO_OP_BANK", label: "Adinath Co-operative Bank" },
  {
    value: "AHMEDABAD_DISTRICT_CO_OP_BANK",
    label: "AHMEDABAD DISTRICT CO-OPERATIVE BANK"
  },
  { value: "AIRTEL_BANK", label: "Airtel Bank" },
  { value: "AKHAND_ANAND", label: "Akhand Ananad Co-Op Bank" },
  { value: "ALLAHABAD", label: "Allahabad Bank" },
  {
    value: "AMBERNATH_JAI_HIND_CO_OP_BANK",
    label: "Ambernath Jai-Hind Co.Op. Bank"
  },
  { value: "ANDHRA_BANK", label: "Andhra Bank" },
  {
    value: "ANNASAHAB_MAGAR_SAHAKARI_BANK",
    label: "Annasaheb Magar Sahakari Bank"
  },
  { value: "APNA_SAHAKARI_BANK", label: "Apna Sahakari Bank" },
  {
    value: "ASSOCIATE_CO_OP_BANK",
    label: "Associate Co-Operative Bank Ltd"
  },
  { value: "AU_SMALL_FINANCE_BANK", label: "AU Small Finance Bank" },
  { value: "AXIS", label: "Axis Bank" },
  {
    value: "Adarsh_Co_Operative_Bank_Ltd",
    label: "Adarsh Co-Operative Bank Ltd"
  },
  { value: "BANDHAN", label: "Bandhan Bank" },
  { value: "BANK_OF_BARODA", label: "Bank Of Baroda" },
  { value: "BANK_OF_INDIA", label: "Bank Of India" },
  { value: "BANK_OF_MAHARASHTRA", label: "Bank Of Maharashtra" },
  {
    value: "BARODA_RAJASTHAN_KSHETRIYA_GRAMIN_BANK",
    label: "Baroda Rajasthan Kshetriya Gramin Bank"
  },
  {
    value: "BASSEIN_CATHOLIC",
    label: "Bassein Catholic Co-Operative Bank Ltd."
  },
  { value: "BHARAT", label: "Bharat Bank" },
  { value: "BHARTIYA_MAHILA_BANK", label: "Bhartiya Mahila Bank" },
  {
    value: "Bhagyodaya_Co_Op_Bank",
    label: "The Bhagyodaya Co-Operative Bank Ltd"
  },
  { value: "Bihar_Gramin_Bank", label: "Bihar Gramin Bank" },
  { value: "CANARA", label: "Canara Bank" },
  {
    value: "CAPITAL_SMALL_FINANCE_BANK_LTD",
    label: "Capital Small Finance Bank Limited"
  },
  { value: "CATHOLIC_SYRIAN", label: "Catholic Syrian Bank" },
  { value: "CENTRAL_BANK", label: "Central Bank of India" },
  {
    value: "CENTRAL_CO_OPERATIVE_BANK",
    label: "Central Co-Operative Bank"
  },
  { value: "CITI", label: "Citi Bank" },
  {
    value: "CITIZEN_CREDIT_CO_OP_BANK",
    label: "Citizen Credit Co Op Bank"
  },
  { value: "CITY_UNION", label: "City Union Bank" },
  { value: "CORPORATION", label: "Corporation Bank" },
  { value: "COSMOS_BANK", label: "The Cosmos Co-Op Bank Ltd." },
  { value: "DBS", label: "DBS Bank Ltd" },
  { value: "DCB", label: "DCB Bank" },
  { value: "DENA_BANK", label: "Dena Bank" },
  { value: "DEUTSCHE_BANK", label: "Deutsche Bank" },
  { value: "DHANLAXMI", label: "Dhanlaxmi Bank" },
  { value: "DNB", label: "DNB Bank" },
  { value: "DNS", label: "DNS Bank" },
  {
    value: "DR_BABASAHEB_AMBEDKAR_MULTISTATE_CO_OP_BANK",
    label: "Dr. Babasaheb Ambedkar Multistate Co-Op Bank"
  },
  {
    value: "EQUITAS_SMALL_FINANCE_BANK",
    label: "Equitas Small Finance Bank"
  },
  { value: "FEDERAL", label: "Federal Bank" },
  { value: "Fino_Payments_Bank", label: "Fino Payments Bank" },
  { value: "GP_PARSIK_BANK", label: "GP Parsik Bank" },
  { value: "GREATER_BOMBAY", label: "The Greater Bombay Co-Op Bank" },
  {
    value: "GUJARAT_AMBUJA_CO_OP_BANK_LTD",
    label: "Gujarat Ambuja CO OP Bank LTD"
  },
  {
    value: "Gujarat_State_Co_Op_Bank",
    label: "The Gujarat State Co Operative Bank Ltd"
  },
  { value: "HDFC", label: "HDFC Bank" },
  { value: "HSBC", label: "HSBC Bank" },
  { value: "ICICI", label: "ICICI Bank" },
  { value: "IDBI", label: "IDBI(Industrial Development Bank of India)" },
  { value: "IDFC", label: "IDFC Bank" },
  { value: "INDIAN_BANK", label: "Indian Bank" },
  { value: "INDIAN_OVERSEAS", label: "Indian Overseas Bank" },
  {
    value: "INDRAPRASTHA_SEHKARI_BANK",
    label: "The Indraprastha Sehkari Bank Ltd."
  },
  { value: "INDUSIND", label: "Indusind Bank" },
  { value: "JAMMU_KASHMIR", label: "Jammu and Kashmir Bank" },
  { value: "JANAKALYAN_SAHAKARI_BANK", label: "Janakalyan Sahakari Bank" },
  { value: "JANASEVA_SAHAKARI_BANK", label: "Janaseva Sahakari Bank Ltd" },
  { value: "JANATA_SAHAKARI_BANK", label: "Janata Sahakari Bank" },
  {
    value: "JANATHA_SEVA_CO_OP_BANK",
    label: "Janatha Seva Co-Operative Bank"
  },
  {
    value: "Jai_Tuljabhavani_Urban_Co_Op_Bank",
    label: "Jai Tuljabhavani Urban Co-Op Bank"
  },
  {
    value: "KALUPUR_COMMERCIAL_CO_OP_BANK",
    label: "Kalupur Commercial Co Op Bank"
  },
  {
    value: "KALYAN_JANATA_SAHAKARI_BANK",
    label: "Kalyan Janata Sahakari Bank Ltd"
  },
  { value: "KANGRA_CO_OP_BANK", label: "Kangra CO-Operative Bank" },
  {
    value: "KANKARIAA_MANINAGAR_NAG_SAH_BANK_LTD",
    label: "Kankariaa Maninagar NAG.SAH.BANK LTD"
  },
  { value: "KARNATAKA", label: "Karnataka Bank" },
  { value: "KARNAVATI_CO_OP_BANK", label: "Karnavati Co-Op Bank" },
  { value: "KARUR_VYASA", label: "Karur Vysya Bank" },
  { value: "KOTAK", label: "Kotak Mahindra Bank" },
  { value: "KURMANCHAL_BANK", label: "Kurmanchal Bank" },
  {
    value: "Kallappanna_Awade_Bank",
    label: "Kallappanna Awade Ichalkaranji Janata Sahakari Bank"
  },
  {
    value: "Karnataka_Vikas_Grameena_Bank",
    label: "Karnataka Vikas Grameena Bank"
  },
  { value: "LAKSHMI_VILAS", label: "Lakshmi Vilas Bank" },
  { value: "MAGAVEERA_CO_OP_BANK_LTD", label: "Mogaveera Co Op Bank LTD" },
  { value: "MAHANAGAR_CO_OP_BANK_LTD", label: "Mahanagar Co Op Bank Ltd" },
  { value: "MAHESH_BANK", label: "Mahesh Bank" },
  { value: "MAHESH_SAHAKARI_BANK_LTD", label: "Mahesh Sahakari Bank Ltd." },
  { value: "MANINAGAR_CO_OP_BANK_LTD", label: "Maninagar CO OP Bank LTD" },
  {
    value: "MANVI_PATTANA_SOUHARADA_SAHAKARI_BANK",
    label: "Manvi Pattana Souharada Sahakari Bank"
  },
  {
    value: "MEHSANA_URBAN_CO_OP_BANK",
    label: "The Mehsana Urban Co-Op Bank Ltd."
  },
  {
    value: "MJALGAON_JANATA_SAHAKARI_BANK",
    label: "Mjalgaon Janata Sahakari Bank"
  },
  { value: "MODEL_CO_OPERATIVE_BANK", label: "Model Co-Operative Bank" },
  { value: "Maharashtra_Gramin_Bank", label: "Maharashtra Gramin Bank" },
  {
    value: "Manorama_Co_op_Bank_Solapur",
    label: "Manorama Co-operative Bank Solapur"
  },
  {
    value: "NAGPUR_NAGARIK_SAHAKARI_BANK",
    label: "Nagpur Nagarik Sahakari Bank"
  },
  { value: "NAINITAL", label: "Nainital Bank" },
  {
    value: "NEELKANT_CO_OP_BANK",
    label: "Neelkanth Co-Operative Bank Ltd"
  },
  { value: "NEW_INDIA_CO_OP_BANK", label: "New India Co-Op Bank Ltd." },
  { value: "NKGSB_CO_OP_BANK", label: "NKGSB Co Op Bank" },
  {
    value: "NUTAN_NAGARIK_SAHAKARI_BANK",
    label: "Nutan Nagarik Sahakari Bank"
  },
  {
    value: "Noida_Commercial_Co_Op_Bank",
    label: "Noida Commercial Co-Operative Bank Ltd"
  },
  { value: "OCEAN_FIRST", label: "Ocean First" },
  { value: "ORIENTAL_BANK", label: "Oriental Bank of Commerce" },
  {
    value: "PADMAVATHI_CO_OP_URBAN_BANK",
    label: "Padmavathi Co Op Urban Bank"
  },
  { value: "PNB", label: "Punjab National Bank" },
  { value: "PRATHAMA_BANK", label: "Prathama Bank" },
  { value: "PRERANA_CO_OP_BANK", label: "Prerana Co-Operative Bank" },
  { value: "PRIME_BANK", label: "Prime Bank" },
  {
    value: "PUNE_PEOPLES_CO_OP_BANK",
    label: "PUNE PEOPLES CO-OPERATIVE BANK"
  },
  {
    value: "PUNJAB_MAHARASHTRA_CO_OP_BANK",
    label: "Punjab &amp; Maharashtra CO-OP Bank LTD(PMC)"
  },
  { value: "PUNJAB_SIND", label: "Punjab &amp; Sind Bank" },
  { value: "PURVANCHAL_BANK", label: "PURVANCHAL BANK" },
  { value: "RBL", label: "RBL Bank Limited" },
  { value: "RBS", label: "Royal Bank of Scotland" },
  { value: "RMGB", label: "Rajasthan Marudhra Grameen Bank" },
  { value: "SAHYDRI_SAHAKARI_BANK", label: "SAHYDRI SAHAKARI BANK" },
  {
    value: "SANGOLA_URBAN_CO_OPERATIVE_BANK_LTD",
    label: "Sangola Urban Co-Op Bank Ltd"
  },
  {
    value: "SARASPUR_NAGARIK_CO_OP_BANK",
    label: "Saraspur Nagarik Co.Op.Bank Ltd"
  },
  { value: "SARASWAT_BANK", label: "Saraswat Bank" },
  {
    value: "SARDAR_BHILADWALA_PARDI_PEOPLES_CO_OP_BANK",
    label: "Sardar Bhiladwala Pardi People's Co-Op Bank"
  },
  {
    value: "SARVODAYA_SAHAKARI_BANK",
    label: "The Sarvodaya Sahakari Bank Ltd"
  },
  { value: "SAURASHTRA_GRAMIN_BANK", label: "Saurashtra Gramin Bank" },
  { value: "SBI", label: "State Bank of India" },
  { value: "SDC", label: "SDC Bank" },
  { value: "SHIVALIK_MERCANTILE_BANK", label: "SHIVALIK MERCANTILE BANK" },
  { value: "SHREE_CO_OP_BANK_LTD", label: "Shree Co Op Bank LTD" },
  {
    value: "SHREE_KADI_NAGARIK_SAHAKARI_BANK",
    label: "Shree Kadi Nagarik Sahakari Bank Ltd"
  },
  { value: "SHRI_ARIHANT_COOP_BANK", label: "Shri Arihant CoOp Bank" },
  {
    value: "SHRI_RAJKOT_DISTRICT_CO_OP_BANK",
    label: "Shri Rajkot District Co Op Bank Ltd"
  },
  {
    value: "SOLAPUR_JANATA_SAHAKARI_BANK",
    label: "Solapur Janata Sahakari Bank Ltd"
  },
  { value: "SOUTH_INDIAN", label: "South Indian Bank" },
  {
    value: "SREENIDHI_SOUHARDA_SAHAKARI_BANK",
    label: "Sreenidhi Souharda Sahakari Bank"
  },
  {
    value: "SREE_MAHAYOGI_LAKSHMAMMA_CO_OP_BANK_LTD",
    label: "SREE MAHAYOGI LAKSHMAMMA CO-OP. BANK LTD."
  },
  { value: "STANDARD_CHARTERED", label: "Standard Chartered Bank" },
  {
    value: "STATE_BANK_BIKANER_JAIPUR",
    label: "State Bank Of Bikaner &amp; Jaipur"
  },
  { value: "STATE_BANK_HYDERABAD", label: "State Bank Of Hyderabad" },
  { value: "STATE_BANK_MYSORE", label: "State Bank Of Mysore" },
  { value: "STATE_BANK_PATIALA", label: "State Bank Of Patiala" },
  { value: "STATE_BANK_TRAVANCORE", label: "State Bank Of Travancore" },
  {
    value: "SURAT_NATIONAL_CO_OP_BANK_LTD",
    label: "Surat National Co Op Bank LTD"
  },
  {
    value: "SURYODAY_SMALL_FINANCE_BANK_LTD",
    label: "Suryoday Small Finance Bank Ltd."
  },
  { value: "SVC_BANK", label: "SVC Co-Operative Bank Ltd." },
  { value: "SYNDICATE", label: "Syndicate Bank" },
  { value: "Sanmathi_Sahakari_Bank", label: "Sanmati Sahakari Bank Ltd" },
  { value: "Shivalik_Mercantile_Bank", label: "SHIVALIK MERCHANTILE BANK" },
  {
    value: "Shree_Mahesh_Co_op_Bank_Nashik",
    label: "Shree Mahesh Co-operative Bank"
  },
  {
    value: "Smriti_Nagrik_Sahakari_Bank",
    label: "Smriti Nagrik Sahakari Bank"
  },
  {
    value: "Sterling_Urban_Co_Op_Bank",
    label: "Sterling Urban Co-Op Bank"
  },
  { value: "TAMILNAD_MERCANTILE", label: "Tamilnad Mercantile Bank" },
  {
    value: "TEXTILE_CO_OPERATIVE_BANK",
    label: "The Textile Co-Operative Bank of Surat Ltd"
  },
  { value: "TGMC_BANK", label: "TGMC Bank Ltd" },
  {
    value: "THANE_BHARAT_SAHAKARI_BANK_LTD",
    label: "Thane Bharat Sahakari Bank Ltd"
  },
  {
    value: "THE_KANAKAMAHALAKSHMI_CO_OP_BANK_LTD",
    label: "The Kanakamahalakshmi Co-Op Bank Ltd"
  },
  {
    value: "THE_KARAD_URBAN_CO_OP_BANK_LTD",
    label: "The Karad Urban Co Op Bank LTD"
  },
  {
    value: "THE_NARODA_NAGRIK_CO_OP_BANK",
    label: "The Naroda Nagrik Co-Op Bank Ltd."
  },
  {
    value: "THE_PANCHSHEEL_MERCANTILE_CO_OP_BANK_LTD",
    label: "The Panchsheel Mercantile Co-Op Bank Ltd"
  },
  {
    value: "THE_RAJKOT_COMMERCIAL_COOP_BANK",
    label: "THE RAJKOT COMMERCIAL CO-OP BANK"
  },
  {
    value: "THE_SATARA_SAHAKARI_BANK_LTD",
    label: "The Satara Sahakari Bank Ltd"
  },
  {
    value: "THE_SURAT_PEOPLE_CO_OP_BANK_LTD",
    label: "The Surat People CO OP Bank LTD"
  },
  { value: "THE_SUTEX_CO_OP_BANK", label: "The Sutex Co Op Bank LTD" },
  {
    value: "THE_VARACHHA_CO_OP_BANK_LTD",
    label: "The Varachha Co Op Bank LTD"
  },
  { value: "THE_VIJAY_CO_OP_BANK", label: "The Vijay Co Op Bank Limited" },
  { value: "TJSB", label: "Thane Janata Sahakari Bank" },
  {
    value: "The_Ahmedabad_Mercantile_Co_Op_Bank",
    label: "The Ahmedabad Mercantile Co-Op Bank"
  },
  {
    value: "The_Ahmednagar_Merchant_Co_Op_Bank_Ltd",
    label: "The Ahmednagar Merchant Co-Op Bank Ltd"
  },
  {
    value: "The_Akola_District_Central_Co_Op_Bank",
    label: "The Akola District Central Co-Op Bank Ltd"
  },
  {
    value: "The_Bardoli_Nagarik_Sahakari_Bank",
    label: "The Bardoli Nagarik Sahakari Bank"
  },
  {
    value: "The_Eenadu_Co_Op_Urban_Bank",
    label: "The Eenadu Co-Op Urban Bank"
  },
  {
    value: "The_Gandhidham_CoOperative_Bank_Ltd",
    label: "The Gandhidham Co-Operative Bank Ltd"
  },
  {
    value: "The_Hindusthan_Co_Op_Bank_Ltd",
    label: "The Hindusthan Co-Op Bank Ltd"
  },
  {
    value: "The_Jalgaon_Peoples_CoOp_Bank",
    label: "THE JALGAON PEOPLES CO-OP BANK"
  },
  {
    value: "The_Panipat_Urban_Co_Op_Bank",
    label: "THE PANIPAT URBAN CO-OPERATIVE BANK LTD"
  },
  {
    value: "The_Vallabh_VidyaNagar_Commercial_Co_Operative_Bank_Ltd",
    label: "The Vallabh VidyaNagar Commercial Co-Operative Bank Ltd"
  },
  {
    value: "The_Vishweshwar_Sahakari_Bank_Ltd",
    label: "The Vishweshwar Sahakari Bank"
  },
  {
    value: "The_Wai_Urban_Co_Operative_Bank_Limited",
    label: "The Wai Urban Co-Operative Bank Limited"
  },
  { value: "UCO", label: "UCO Bank" },
  {
    value: "UJJIVAN_SMALL_FINANCE_BANK",
    label: "Ujjivan Small Finance Bank"
  },
  { value: "UNION_BANK", label: "Union Bank Of India" },
  { value: "UNION_CO_OP_BANK_LTD", label: "THE UNION CO-OP BANK LTD" },
  { value: "UNITED_BANK", label: "United Bank of India" },
  {
    value: "Utkarsh_Small_Finance_Bank",
    label: "Utkarsh Small Finance Bank"
  },
  { value: "Uttarakhand_Gramin_Bank", label: "Uttarakhand Gramin Bank" },
  {
    value: "VAIJAPUR_MARCHANTS_CO_OP_BANK",
    label: "Vaijapur Marchants Co Op Bank"
  },
  { value: "VASAI_VIKAS_SAH_BANK_LTD", label: "Vasai Vikas Sah Bank Ltd" },
  {
    value: "VIDARBHA_MERCHANTS_URBAN_CO_OP_BANK_LTD",
    label: "Vidarbha Merchants Urban Co-Op Bank Ltd"
  },
  { value: "VIDYA_SAHKARI_BANK_LTD", label: "Vidya Sahkari Bank LTD" },
  { value: "VIJAYA", label: "Vijaya Bank" },
  {
    value: "Vaishya_Nagari_Sahakari_Bank",
    label: "Vaishya Nagari Sahakari Bank"
  },
  { value: "Vananchal_Gramin_Bank", label: "Vananchal Gramin Bank" },
  { value: "YES", label: "Yes Bank" },
  {
    value: "ZOROASTRIAN_CO_OP_BANK",
    label: "Zoroastrian Co Op Bank Limited"
  }
];
