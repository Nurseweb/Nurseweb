"use client"

export interface Course {
  id: string
  title: string
  titleMn: string
  description: string
  descriptionMn: string
  language: "en" | "mn"
  duration: string
  lessons: number
  image: string
  content: {
    title: string
    titleMn: string
    sections: {
      heading: string
      headingMn: string
      body: string
      bodyMn: string
    }[]
  }
}

export interface Question {
  id: number
  question: string
  questionMn: string
  options: string[]
  optionsMn: string[]
  correctAnswer: number
}

export const courses: Course[] = [
  {
    id: "patient-care-en",
    title: "Patient Care Fundamentals",
    titleMn: "Өвчтөн асаргааны үндэс",
    description: "Learn essential patient care techniques and best practices for healthcare professionals.",
    descriptionMn: "Эрүүл мэндийн мэргэжилтнүүдэд зориулсан өвчтөн асаргааны үндсэн арга техникийг сурах.",
    language: "en",
    duration: "4 hours",
    lessons: 12,
    image: "/images/healthcare-team.jpg",
    content: {
      title: "Patient Care Fundamentals",
      titleMn: "Өвчтөн асаргааны үндэс",
      sections: [
        {
          heading: "Introduction to Patient Care",
          headingMn: "Өвчтөн асаргааны танилцуулга",
          body: "Patient care is the foundation of healthcare. It encompasses all services rendered by health professionals to patients for the purpose of maintaining, monitoring, or restoring health. Quality patient care requires a combination of clinical expertise, effective communication, and genuine compassion.",
          bodyMn: "Өвчтөн асаргаа нь эрүүл мэндийн тусламж үйлчилгээний үндэс суурь юм. Энэ нь эрүүл мэндийг хадгалах, хянах эсвэл сэргээх зорилгоор эрүүл мэндийн мэргэжилтнүүдээс өвчтөнд үзүүлж буй бүх үйлчилгээг хамарна."
        },
        {
          heading: "Communication Skills",
          headingMn: "Харилцааны ур чадвар",
          body: "Effective communication is vital in healthcare. It includes active listening, clear verbal communication, appropriate non-verbal cues, and empathetic responses. Healthcare providers must be able to explain complex medical information in understandable terms while being sensitive to patients' emotional states.",
          bodyMn: "Үр дүнтэй харилцаа холбоо нь эрүүл мэндийн салбарт маш чухал. Энэ нь идэвхтэй сонсох, тодорхой аман харилцаа, зохистой биеийн хэлэмж, өрөвдөх сэтгэлтэй хариу үйлдэл зэргийг багтаана."
        },
        {
          heading: "Safety Protocols",
          headingMn: "Аюулгүй байдлын журам",
          body: "Patient safety is paramount in healthcare settings. This includes proper hand hygiene, correct medication administration, fall prevention measures, infection control practices, and accurate patient identification. Following safety protocols protects both patients and healthcare workers.",
          bodyMn: "Өвчтөний аюулгүй байдал нь эрүүл мэндийн байгууллагад хамгийн чухал. Үүнд гар угаах зөв дэглэм, эмийг зөв хэрэглэх, унахаас урьдчилан сэргийлэх арга хэмжээ, халдвар хяналтын практик зэрэг багтана."
        },
        {
          heading: "Documentation Best Practices",
          headingMn: "Баримтжуулалтын шилдэг туршлага",
          body: "Accurate documentation is essential for continuity of care, legal protection, and quality improvement. All patient interactions, treatments, and observations should be recorded promptly and accurately. Documentation should be objective, factual, and complete.",
          bodyMn: "Үнэн зөв баримтжуулалт нь тусламж үйлчилгээний тасралтгүй байдал, хууль эрх зүйн хамгаалалт, чанарыг сайжруулахад зайлшгүй шаардлагатай."
        }
      ]
    }
  },
  {
    id: "patient-care-mn",
    title: "Өвчтөн асаргааны үндэс",
    titleMn: "Өвчтөн асаргааны үндэс",
    description: "Эрүүл мэндийн мэргэжилтнүүдэд зориулсан өвчтөн асаргааны үндсэн арга техникийг сурах.",
    descriptionMn: "Эрүүл мэндийн мэргэжилтнүүдэд зориулсан өвчтөн асаргааны үндсэн арга техникийг сурах.",
    language: "mn",
    duration: "4 цаг",
    lessons: 12,
    image: "/images/healthcare-team.jpg",
    content: {
      title: "Өвчтөн асаргааны үндэс",
      titleMn: "Өвчтөн асаргааны үндэс",
      sections: [
        {
          heading: "Өвчтөн асаргааны танилцуулга",
          headingMn: "Өвчтөн асаргааны танилцуулга",
          body: "Өвчтөн асаргаа нь эрүүл мэндийн тусламж үйлчилгээний үндэс суурь юм. Энэ нь эрүүл мэндийг хадгалах, хянах эсвэл сэргээх зорилгоор эрүүл мэндийн мэргэжилтнүүдээс өвчтөнд үзүүлж буй бүх үйлчилгээг хамарна. Чанартай өвчтөн асаргаа нь клиникийн мэдлэг чадвар, үр дүнтэй харилцаа холбоо, жинхэнэ өрөвдөх сэтгэлийн хослолыг шаарддаг.",
          bodyMn: "Өвчтөн асаргаа нь эрүүл мэндийн тусламж үйлчилгээний үндэс суурь юм."
        },
        {
          heading: "Харилцааны ур чадвар",
          headingMn: "Харилцааны ур чадвар",
          body: "Үр дүнтэй харилцаа холбоо нь эрүүл мэндийн салбарт маш чухал юм. Энэ нь идэвхтэй сонсох, тодорхой аман харилцаа, зохистой биеийн хэлэмж, өрөвдөх сэтгэлтэй хариу үйлдэл зэргийг багтаана. Эрүүл мэндийн мэргэжилтнүүд өвчтөний сэтгэл хөдлөлийн байдалд анхаарал хандуулж, нарийн төвөгтэй эмнэлгийн мэдээллийг ойлгомжтойгоор тайлбарлах чадвартай байх ёстой.",
          bodyMn: "Үр дүнтэй харилцаа холбоо нь эрүүл мэндийн салбарт маш чухал юм."
        },
        {
          heading: "Аюулгүй байдлын журам",
          headingMn: "Аюулгүй байдлын журам",
          body: "Өвчтөний аюулгүй байдал нь эрүүл мэндийн байгууллагад хамгийн чухал. Үүнд гар угаах зөв дэглэм, эмийг зөв хэрэглэх, унахаас урьдчилан сэргийлэх арга хэмжээ, халдвар хяналтын практик, өвчтөнийг үнэн зөв тодорхойлох зэрэг багтана. Аюулгүй байдлын журмыг дагаж мөрдөх нь өвчтөн болон эрүүл мэндийн ажилтнуудыг хоёуланг нь хамгаална.",
          bodyMn: "Өвчтөний аюулгүй байдал нь эрүүл мэндийн байгууллагад хамгийн чухал."
        },
        {
          heading: "Баримтжуулалтын шилдэг туршлага",
          headingMn: "Баримтжуулалтын шилдэг туршлага",
          body: "Үнэн зөв баримтжуулалт нь тусламж үйлчилгээний тасралтгүй байдал, хууль эрх зүйн хамгаалалт, чанарыг сайжруулахад зайлшгүй шаардлагатай. Өвчтөнтэй харилцсан бүх харилцаа, эмчилгээ, ажиглалтыг шуурхай, үнэн зөв бүртгэх ёстой. Баримтжуулалт нь объектив, баримтад суурилсан, бүрэн гүйцэд байх ёстой.",
          bodyMn: "Үнэн зөв баримтжуулалт нь тусламж үйлчилгээний тасралтгүй байдалд зайлшгүй шаардлагатай."
        }
      ]
    }
  }
]

export const questionsPool: Question[] = [
  {
    id: 1,
    question: "What is the most important aspect of hand hygiene?",
    questionMn: "Гар ариутгалын хамгийн чухал тал нь юу вэ?",
    options: ["Using hot water", "Washing for at least 20 seconds", "Using antibacterial soap only", "Washing once per shift"],
    optionsMn: ["Халуун ус хэрэглэх", "Хамгийн багадаа 20 секунд угаах", "Зөвхөн нянгийн эсрэг саван хэрэглэх", "Ээлжинд нэг удаа угаах"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which communication technique is most effective with anxious patients?",
    questionMn: "Сандарсан өвчтөнтэй харилцахад ямар арга техник хамгийн үр дүнтэй вэ?",
    options: ["Speaking quickly to finish faster", "Active listening and empathy", "Avoiding eye contact", "Using medical jargon"],
    optionsMn: ["Хурдан ярьж дуусгах", "Идэвхтэй сонсох ба өрөвдөх сэтгэл", "Нүд тулгахаас зайлсхийх", "Эмнэлгийн нэр томъёо хэрэглэх"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What should be documented after administering medication?",
    questionMn: "Эм өгсний дараа юуг баримтжуулах ёстой вэ?",
    options: ["Only if there's a problem", "Time, dose, route, and patient response", "Just the medication name", "Nothing if routine"],
    optionsMn: ["Зөвхөн асуудал гарвал", "Цаг, тун, арга, өвчтөний хариу урвал", "Зөвхөн эмийн нэр", "Энгийн бол юу ч биш"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is the primary purpose of patient identification bands?",
    questionMn: "Өвчтөний таних бүс хэрэглэх гол зорилго юу вэ?",
    options: ["Hospital decoration", "Preventing medical errors", "Tracking patient location", "Insurance purposes"],
    optionsMn: ["Эмнэлгийн чимэглэл", "Эмнэлгийн алдаанаас урьдчилан сэргийлэх", "Өвчтөний байршлыг хянах", "Даатгалын зорилгоор"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "How often should patient positions be changed to prevent pressure ulcers?",
    questionMn: "Дарагдлын шарх үүсэхээс урьдчилан сэргийлэхийн тулд өвчтөний байрлалыг хэр олон удаа солих ёстой вэ?",
    options: ["Once daily", "Every 2 hours", "Only when requested", "Every 8 hours"],
    optionsMn: ["Өдөрт нэг удаа", "2 цаг тутамд", "Зөвхөн хүсэлтээр", "8 цаг тутамд"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What is the correct order for donning PPE?",
    questionMn: "Хамгаалах хувцас өмсөх зөв дараалал юу вэ?",
    options: ["Gloves, gown, mask, goggles", "Gown, mask, goggles, gloves", "Mask, gloves, gown, goggles", "Any order is fine"],
    optionsMn: ["Бээлий, халад, маск, нүдний шил", "Халад, маск, нүдний шил, бээлий", "Маск, бээлий, халад, нүдний шил", "Ямар ч дараалал болно"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What should you do if a patient refuses medication?",
    questionMn: "Өвчтөн эм уухаас татгалзвал та юу хийх ёстой вэ?",
    options: ["Force them to take it", "Document and notify the physician", "Ignore the refusal", "Give a different medication"],
    optionsMn: ["Албадан уулгах", "Баримтжуулж эмчид мэдэгдэх", "Татгалзлыг үл тоох", "Өөр эм өгөх"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Which vital sign change requires immediate attention?",
    questionMn: "Ямар амин үзүүлэлтийн өөрчлөлт яаралтай анхаарал шаарддаг вэ?",
    options: ["Temperature of 37°C", "Blood pressure 120/80", "Oxygen saturation below 90%", "Pulse of 72 bpm"],
    optionsMn: ["37°C халуун", "Даралт 120/80", "Хүчилтөрөгчийн ханалт 90%-иас доош", "Судасны лугшилт 72"],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "What is the best way to verify a patient's identity?",
    questionMn: "Өвчтөний хэн болохыг баталгаажуулах хамгийн сайн арга юу вэ?",
    options: ["Ask their room number", "Check the ID band and ask their name and DOB", "Assume based on location", "Ask a family member"],
    optionsMn: ["Өрөөний дугаар асуух", "Таних бүс шалгаж нэр, төрсөн огноо асуух", "Байршилаар таамаглах", "Гэр бүлийн гишүүнээс асуух"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What is the purpose of a nursing care plan?",
    questionMn: "Сувилахуйн асаргааны төлөвлөгөөний зорилго юу вэ?",
    options: ["Hospital billing", "Guide individualized patient care", "Legal requirement only", "Staff scheduling"],
    optionsMn: ["Эмнэлгийн төлбөр тооцоо", "Өвчтөн бүрд тохирсон асаргааг чиглүүлэх", "Зөвхөн хуулийн шаардлага", "Ажилтнуудын хуваарь"],
    correctAnswer: 1
  },
  {
    id: 11,
    question: "When should healthcare workers perform hand hygiene?",
    questionMn: "Эрүүл мэндийн ажилтнууд гараа хэзээ ариутгах ёстой вэ?",
    options: ["Only before procedures", "Before and after patient contact", "Only when visibly dirty", "Once per hour"],
    optionsMn: ["Зөвхөн процедурын өмнө", "Өвчтөнтэй харьцахын өмнө болон дараа", "Зөвхөн харагдахуйц бохирдсон үед", "Цагт нэг удаа"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "What is the recommended method for lifting heavy patients?",
    questionMn: "Хүнд өвчтөнийг өргөхөд зөвлөмж болгож буй арга юу вэ?",
    options: ["Use your back muscles", "Get assistance and use proper lifting equipment", "Lift quickly", "Bend at the waist"],
    optionsMn: ["Нуруу булчингаа ашиглах", "Туслалцаа авч зөв өргөх тоног төхөөрөмж ашиглах", "Хурдан өргөх", "Бүсэлхийгээр нугалах"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "What should be included in patient handoff communication?",
    questionMn: "Өвчтөн хүлээлгэж өгөх харилцаанд юу орох ёстой вэ?",
    options: ["Only name and room number", "Complete patient status, plan, and concerns", "Shift schedule", "Personal opinions only"],
    optionsMn: ["Зөвхөн нэр, өрөөний дугаар", "Өвчтөний бүрэн байдал, төлөвлөгөө, санаа зовоосон зүйлс", "Ээлжийн хуваарь", "Зөвхөн хувийн санал бодол"],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "How should sharps be disposed of?",
    questionMn: "Хурц зүйлсийг хэрхэн устгах ёстой вэ?",
    options: ["In regular trash", "In designated sharps containers", "Recap and reuse", "Down the sink"],
    optionsMn: ["Энгийн хогийн саванд", "Зориулалтын хурц зүйлсийн саванд", "Тагийг тавьж дахин хэрэглэх", "Угаалтуурт хийх"],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "What is the most common cause of hospital-acquired infections?",
    questionMn: "Эмнэлгээс шалтгаалах халдварын хамгийн түгээмэл шалтгаан юу вэ?",
    options: ["Contaminated food", "Poor hand hygiene", "Visitors", "Air conditioning"],
    optionsMn: ["Бохирдсон хоол", "Гар ариутгалын дутагдал", "Зочид", "Агааржуулалт"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "What is the purpose of isolation precautions?",
    questionMn: "Тусгаарлах урьдчилан сэргийлэлтийн зорилго юу вэ?",
    options: ["Punish the patient", "Prevent spread of infection", "Save space", "Reduce nursing workload"],
    optionsMn: ["Өвчтөнийг шийтгэх", "Халдварын тархалтаас урьдчилан сэргийлэх", "Зай хэмнэх", "Сувилагчийн ачааллыг бууруулах"],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "What should you assess before ambulating a patient?",
    questionMn: "Өвчтөнийг явуулахын өмнө юуг үнэлэх ёстой вэ?",
    options: ["Room temperature", "Vital signs, strength, and balance", "TV channel", "Visitor presence"],
    optionsMn: ["Өрөөний температур", "Амин үзүүлэлт, хүч, тэнцвэр", "ТВ суваг", "Зочдын байгаа эсэх"],
    correctAnswer: 1
  },
  {
    id: 18,
    question: "What is therapeutic communication?",
    questionMn: "Эмчилгээний харилцаа гэж юу вэ?",
    options: ["Casual conversation", "Purposeful interaction to support patient wellbeing", "Medical terminology", "Written communication only"],
    optionsMn: ["Энгийн яриа", "Өвчтөний сайн сайхан байдлыг дэмжих зорилготой харилцаа", "Эмнэлгийн нэр томъёо", "Зөвхөн бичгэн харилцаа"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "How should medications be stored?",
    questionMn: "Эмийг хэрхэн хадгалах ёстой вэ?",
    options: ["Anywhere convenient", "According to manufacturer guidelines", "In patient rooms", "Mixed together to save space"],
    optionsMn: ["Хаана ч тохиромжтой газар", "Үйлдвэрлэгчийн зааварчилгааны дагуу", "Өвчтөний өрөөнд", "Зай хэмнэхийн тулд холих"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "What is the purpose of bed rails?",
    questionMn: "Орны хашлагын зорилго юу вэ?",
    options: ["Decoration", "Prevent falls and assist with positioning", "Restraint only", "Store supplies"],
    optionsMn: ["Чимэглэл", "Унахаас урьдчилан сэргийлж байрлалд тусалах", "Зөвхөн хязгаарлалт", "Хэрэгсэл хадгалах"],
    correctAnswer: 1
  }
]

export function getRandomQuestions(count: number = 10): Question[] {
  const shuffled = [...questionsPool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
