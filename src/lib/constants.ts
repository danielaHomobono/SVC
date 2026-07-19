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
    weekdays: 'Lunes a Viernes · 8:30 a 12:30 y 15:30 a 19:30 hs',
    saturday: 'Sábados · 8 a 13 hs',
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
    description: 'Diseñamos y fabricamos cocinas a medida, aprovechando cada centímetro de tu espacio.',
    image: '/images/servicios/cocinas.jpg',
    features: ['Diseño personalizado', 'Herrajes de primera'],
  },
  {
    id: 'placares',
    name: 'Placares y Vestidores',
    description: 'Placares y vestidores con sistemas de organización pensados para tu día a día.',
    image: '/images/servicios/placares.jpg',
    features: ['Interiores a medida', 'Terminaciones prolijas'],
  },
  {
    id: 'banos',
    name: 'Baños',
    description: 'Vanitorios y muebles de baño en materiales que resisten la humedad sin perder estética.',
    image: '/images/servicios/banos.jpg',
    features: ['Materiales resistentes', 'Diseño funcional'],
  },
  {
    id: 'medida',
    name: 'Muebles a medida',
    description: 'Racks de TV, muebles comerciales y proyectos especiales. Si lo imaginás, lo fabricamos.',
    image: '/images/servicios/medida.jpg',
    features: ['Proyectos únicos', 'Asesoramiento sin cargo'],
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

