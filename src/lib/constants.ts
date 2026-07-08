export const BUSINESS = {
  name: 'SVC Amoblamientos',
  tagline: 'Muebles a medida que transforman espacios',
  phone: '+5493571234567', // Reemplazar con número real
  email: 'contacto@svcamoblamientos.com',
  city: 'Río Tercero, Córdoba',
  instagram: '@svc_amoblamientos',
  leadTime: '48 horas de anticipación para presupuestos',
}

export const WHATSAPP_URL = `https://wa.me/${BUSINESS.phone.replace(/\D/g, '')}?text=Hola%2C%20me%20interesa%20un%20presupuesto%20para%20muebles`

export const SERVICES = [
  { 
    id: 'cocinas', 
    name: 'Cocinas Premium', 
    description: 'Diseño y fabricación de muebles de cocina a medida. Aprovechamos cada espacio con soluciones inteligentes y materiales de primera calidad.',
    features: ['Medidas personalizadas', 'Herrajes alemanes', 'Acabados a elección', 'Asesoramiento gratuito'],
  },
  { 
    id: 'comedores', 
    name: 'Comedores Elegantes', 
    description: 'Mesas, sillas y aparadores que transforman cada comida en una experiencia memorable. Combinamos funcionalidad con diseño único.',
    features: ['Maderas nobles', 'Diseño personalizado', 'Instalación incluida', 'Garantía 5 años'],
  },
  { 
    id: 'dormitorios', 
    name: 'Dormitorios Funcionales', 
    description: 'Placares, cómodas y cabeceras que combinan funcionalidad y estética. Maximizamos el espacio de almacenamiento.',
    features: ['Placares con espejo', 'Sistemas de organización', 'Iluminación integrada', 'Cierre suave'],
  },
  { 
    id: 'baños', 
    name: 'Baños Modernos', 
    description: 'Vanitorios y muebles de baño que resisten la humedad con elegancia. Soluciones innovadoras para espacios reducidos.',
    features: ['Materiales hidrófugos', 'Espacio de almacenamiento', 'Espejos con luz', 'Mantenimiento fácil'],
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

