'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  nombre: z.string().min(2, 'Ingresá tu nombre'),
  telefono: z.string().min(8, 'Ingresá un teléfono válido'),
  tipoProyecto: z.enum([
    'Cocina',
    'Placar / Vestidor',
    'Baño',
    'Rack de TV',
    'Mueble comercial',
    'Otro',
  ]),
  mensaje: z.string().max(500).optional(),
})

type FormData = z.infer<typeof schema>

const NUMERO_WHATSAPP = '5493571692109'

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Cocina')
  const opciones = [
    'Cocina',
    'Placar / Vestidor',
    'Baño',
    'Rack de TV',
    'Mueble comercial',
    'Otro',
  ]

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: '',
      telefono: '',
      tipoProyecto: 'Cocina',
      mensaje: '',
    }
  })

  const onSubmit = (data: FormData) => {
    // Armar el mensaje con los datos del formulario
    const mensaje = `Hola! Quiero hacer una consulta.

*Nombre:* ${data.nombre}
*Teléfono:* ${data.telefono}
*Tipo de proyecto:* ${data.tipoProyecto}
${data.mensaje ? `*Mensaje:* ${data.mensaje}` : ''}`

    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje.trim())

    // Abrir WhatsApp con el mensaje pre-cargado
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCodificado}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleSelectOption = (op: 'Cocina' | 'Placar / Vestidor' | 'Baño' | 'Rack de TV' | 'Mueble comercial' | 'Otro') => {
    setSelected(op)
    setValue('tipoProyecto', op)
    setIsOpen(false)
  }

  // Styles defined in the prompt:
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(201, 168, 76, 0.3)',
    padding: '0.75rem 0',
    color: 'var(--color-cream)',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'border-color 300ms ease',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-grain)',
    marginBottom: '0.5rem',
    display: 'block',
  }

  const errorStyle: React.CSSProperties = {
    color: '#ef4444', // Red-500 fallback for var(--color-error)
    fontSize: '0.8rem',
    marginTop: '0.35rem',
    fontFamily: 'var(--font-body)',
    display: 'block',
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      {/* Label superior del formulario */}
      <div className="mb-4">
        <span className="text-gold text-xs font-mono tracking-widest uppercase">
          Contanos tu proyecto y te respondemos por WhatsApp
        </span>
      </div>

      {/* Nombre */}
      <div>
        <label style={labelStyle}>Nombre completo</label>
        <input
          type="text"
          placeholder="Tu nombre completo"
          {...register('nombre')}
          style={inputStyle}
          className="focus:border-b-gold transition-colors duration-300 placeholder:text-grain/25"
        />
        {errors.nombre && (
          <span style={errorStyle}>{errors.nombre.message}</span>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label style={labelStyle}>Teléfono</label>
        <input
          type="tel"
          placeholder="Ej: +54 9 3571 00-0000"
          {...register('telefono')}
          style={inputStyle}
          className="focus:border-b-gold transition-colors duration-300 placeholder:text-grain/25"
        />
        {errors.telefono && (
          <span style={errorStyle}>{errors.telefono.message}</span>
        )}
      </div>

      {/* Tipo de proyecto */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <label style={labelStyle}>Tipo de proyecto</label>
        <input type="hidden" {...register('tipoProyecto')} value={selected} />
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '0.75rem 0',
            borderBottom: '1px solid rgba(201, 168, 76, 0.3)',
            color: 'var(--color-cream)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
          }}
        >
          {selected}
          <span style={{ color: 'var(--color-gold)' }}>{isOpen ? '▲' : '▼'}</span>
        </div>

        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--color-void)',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            borderRadius: '2px',
            marginTop: '4px',
            zIndex: 100,
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
          }}>
            {opciones.map((op) => (
              <div
                key={op}
                onClick={() => handleSelectOption(op as any)}
                style={{
                  padding: '0.75rem 1rem',
                  color: 'var(--color-cream)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  transition: 'background 200ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-oak-dark)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                {op}
              </div>
            ))}
          </div>
        )}
        {errors.tipoProyecto && (
          <span style={errorStyle}>{errors.tipoProyecto.message}</span>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label style={labelStyle}>Mensaje (opcional)</label>
        <textarea
          placeholder="Escribí aquí los detalles de tu consulta..."
          rows={4}
          {...register('mensaje')}
          style={inputStyle}
          className="focus:border-b-gold transition-colors duration-300 resize-none placeholder:text-grain/25"
        />
        {errors.mensaje && (
          <span style={errorStyle}>{errors.mensaje.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            width: '100%',
            padding: '1rem',
            background: 'var(--color-gold)',
            color: 'var(--color-void)',
            border: 'none',
            borderRadius: '4px',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 300ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-gold-muted)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-gold)'
          }}
        >
          {/* Ícono WhatsApp — mantener, ahora en color oscuro */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.565 4.14 1.543 5.877L.057 23.5l5.773-1.486A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.389l-.361-.214-3.424.881.91-3.317-.235-.381A9.818 9.818 0 1112 21.818z"/>
          </svg>
          Enviar consulta por WhatsApp
        </button>
      </div>
    </form>
  )
}
