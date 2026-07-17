export const BUSINESS = {
  name: 'SVC Amoblamientos',
  address: 'Independencia 58, Río Tercero, Córdoba',
  addressShort: 'Independencia 58, Río Tercero',
  postalCode: 'X5850',
  city: 'Río Tercero, Córdoba',
  phone: '+5493571692109',
  phoneDisplay: '+54 9 3571 69-2109',
  instagram: 'https://www.instagram.com/svc_amoblamientos/',
  instagramHandle: '@svc_amoblamientos',
  facebook: 'https://www.facebook.com/p/SVC-amoblamientos-100051401985732/?locale=es_LA',
  facebookHandle: 'SVC Amoblamientos',
  googleMaps: 'https://www.google.com/maps/place/SVC+Amoblamientos/@-32.1764823,-64.1048062,17z',
  hours: {
    weekdays: 'Lunes a Viernes · 9 a 18hs',
    saturday: 'Sábados · 9 a 13hs',
  },
}

// URL de WhatsApp con mensaje pre-cargado
export const WHATSAPP_URL = `https://wa.me/5493571692109?text=${encodeURIComponent(
  'Hola! Me interesa un presupuesto para muebles a medida.'
)}`

export const SERVICES = [
  {
    id: 'cocinas',
    name: 'Cocinas',
    description: 'Diseño y fabricación de muebles de cocina a medida.',
    image: '/images/portfolio/cocina-1.jpg',
    features: ['Medidas personalizadas', 'Herrajes de primera'],
  },
  {
    id: 'comedores',
    name: 'Comedores',
    description: 'Mesas, sillas y aparadores que transforman cada comida.',
    image: '/images/portfolio/comedor-1.jpg',
    features: ['Diseño personalizado', 'Maderas seleccionadas'],
  },
  {
    id: 'dormitorios',
    name: 'Dormitorios',
    description: 'Placares y cómodas que combinan funcionalidad y estética.',
    image: '/images/portfolio/placar-1.jpg',
    features: ['Placares con espejo', 'Sistemas de organización'],
  },
  {
    id: 'banos',
    name: 'Baños',
    description: 'Vanitorios y muebles de baño que resisten la humedad.',
    image: '/images/portfolio/bano-1.jpg',
    features: ['Materiales resistentes', 'Terminaciones premium'],
  },
]

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Alejandro Rodríguez',
    city: 'Río Tercero',
    text: 'SVC Amoblamientos superó todas nuestras expectativas. Diseñaron y fabricaron el mueble de nuestra cocina a medida. La calidad de la madera y de los herrajes es insuperable. El trato fue súper profesional en todo momento.',
    rating: 5,
    role: 'Propietario Casa de Campo',
  },
  {
    id: 't2',
    name: 'Carolina Giraudo',
    city: 'Río Tercero',
    text: 'Excelente servicio. El placard del dormitorio principal quedó espectacular, con un aprovechamiento de espacio impecable y cierre suave en todas las cajoneras. Se nota la dedicación y el profesionalismo artesanal.',
    rating: 5,
    role: 'Diseñadora de Interiores',
  },
  {
    id: 't3',
    name: 'Mariano Brossi',
    city: 'Almafuerte',
    text: 'Súper recomendados. Cumplieron exactamente con los tiempos de entrega pactados y la instalación fue rápida y muy prolija. El vanitory flotante y la mesa de comedor maciza cambiaron por completo nuestra casa.',
    rating: 5,
    role: 'Propietario Dúplex',
  },
]

