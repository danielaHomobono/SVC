export type GalleryCategory = {
  id: string
  label: string
  images: { src: string; alt: string }[]
}

export const GALLERY: GalleryCategory[] = [
  {
    id: 'cocinas',
    label: 'Cocinas',
    images: [
      { src: '/images/galeria/cocinas/cocina-1.jpg', alt: 'Cocina a medida SVC' },
      { src: '/images/galeria/cocinas/cocina-2.jpg', alt: 'Isla de cocina a medida SVC' },
      { src: '/images/galeria/cocinas/cocina-3.jpg', alt: 'Detalle de terminación cocina SVC' },
    ],
  },
  {
    id: 'placares',
    label: 'Placares y Vestidores',
    images: [
      { src: '/images/galeria/placares/placard-1.jpg', alt: 'Placard a medida SVC' },
    ],
  },
  {
    id: 'banos',
    label: 'Baños',
    images: [
      { src: '/images/galeria/banos/bano-1.jpg', alt: 'Mueble de baño SVC' },
    ],
  },
  {
    id: 'racks',
    label: 'Racks de TV',
    images: [
      { src: '/images/galeria/racks/rack-1.jpg', alt: 'Rack de TV a medida SVC' },
    ],
  },
  {
    id: 'comerciales',
    label: 'Comerciales',
    images: [
      { src: '/images/galeria/comerciales/comercial-1.jpg', alt: 'Mueble comercial SVC' },
    ],
  },
]
