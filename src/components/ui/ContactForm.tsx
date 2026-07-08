'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  telefono: z.string().min(8, { message: 'El teléfono debe tener al menos 8 números.' }),
  email: z.string().email({ message: 'Ingresa un correo electrónico válido.' }).or(z.literal('')),
  servicio: z.enum(['cocinas', 'comedores', 'dormitorios', 'baños', 'otro']),
  mensaje: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }).max(500),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: '',
      telefono: '',
      email: '',
      servicio: 'cocinas',
      mensaje: '',
    }
  })

  function onSubmit(data: FormData) {
    setIsSubmitting(true)
    // Simular envío de datos a servidor de forma limpia
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitSuccessful(true)
    }, 1500)
  }

  if (isSubmitSuccessful) {
    return (
      <div className="bg-charcoal/50 border border-gold/20 rounded-xl p-8 text-center space-y-4 max-w-md mx-auto backdrop-blur-md">
        <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold text-2xl">
          ✓
        </div>
        <h3 className="font-display font-light text-2xl text-ivory">¡Consulta Recibida!</h3>
        <p className="text-grain/80 text-sm leading-relaxed">
          Gracias por comunicarte con SVC Amoblamientos. Nos pondremos en contacto a la brevedad para asesorarte en tu proyecto.
        </p>
        <button 
          onClick={() => setIsSubmitSuccessful(false)}
          className="mt-4 text-xs font-mono uppercase tracking-widest text-gold hover:text-ivory transition-colors duration-300"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      {/* Name Input */}
      <div className="relative group">
        <input 
          type="text"
          placeholder=" "
          {...register('nombre')}
          className={`w-full bg-void/50 border ${errors.nombre ? 'border-red-500/50 focus:border-red-500' : 'border-gold/20 focus:border-gold'} rounded-lg px-4 pt-6 pb-2 text-ivory text-base focus:outline-none transition-colors duration-300 peer`}
        />
        <label className="absolute left-4 top-2 text-grain/60 text-xs uppercase tracking-wider font-mono transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold pointer-events-none">
          Nombre completo
        </label>
        {errors.nombre && (
          <span className="text-red-500 text-xs block mt-1 font-mono">{errors.nombre.message}</span>
        )}
      </div>

      {/* Phone and Email Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone Input */}
        <div className="relative group">
          <input 
            type="tel"
            placeholder=" "
            {...register('telefono')}
            className={`w-full bg-void/50 border ${errors.telefono ? 'border-red-500/50 focus:border-red-500' : 'border-gold/20 focus:border-gold'} rounded-lg px-4 pt-6 pb-2 text-ivory text-base focus:outline-none transition-colors duration-300 peer`}
          />
          <label className="absolute left-4 top-2 text-grain/60 text-xs uppercase tracking-wider font-mono transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold pointer-events-none">
            Teléfono
          </label>
          {errors.telefono && (
            <span className="text-red-500 text-xs block mt-1 font-mono">{errors.telefono.message}</span>
          )}
        </div>

        {/* Email Input */}
        <div className="relative group">
          <input 
            type="email"
            placeholder=" "
            {...register('email')}
            className={`w-full bg-void/50 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-gold/20 focus:border-gold'} rounded-lg px-4 pt-6 pb-2 text-ivory text-base focus:outline-none transition-colors duration-300 peer`}
          />
          <label className="absolute left-4 top-2 text-grain/60 text-xs uppercase tracking-wider font-mono transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold pointer-events-none">
            Email (Opcional)
          </label>
          {errors.email && (
            <span className="text-red-500 text-xs block mt-1 font-mono">{errors.email.message}</span>
          )}
        </div>
      </div>

      {/* Service Selector */}
      <div className="relative group">
        <select 
          {...register('servicio')}
          className="w-full bg-void/50 border border-gold/20 rounded-lg px-4 pt-6 pb-2 text-ivory text-base focus:outline-none focus:border-gold transition-colors duration-300 appearance-none cursor-pointer"
        >
          <option value="cocinas" className="bg-charcoal text-ivory">Cocinas Premium</option>
          <option value="comedores" className="bg-charcoal text-ivory">Comedores Elegantes</option>
          <option value="dormitorios" className="bg-charcoal text-ivory">Dormitorios Funcionales</option>
          <option value="baños" className="bg-charcoal text-ivory">Baños Modernos</option>
          <option value="otro" className="bg-charcoal text-ivory">Otros Proyectos</option>
        </select>
        <label className="absolute left-4 top-2 text-grain/60 text-xs uppercase tracking-wider font-mono pointer-events-none">
          Tipo de Proyecto
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold/60">
          ▼
        </div>
      </div>

      {/* Message Textarea */}
      <div className="relative group">
        <textarea 
          placeholder=" "
          rows={5}
          {...register('mensaje')}
          className={`w-full bg-void/50 border ${errors.mensaje ? 'border-red-500/50 focus:border-red-500' : 'border-gold/20 focus:border-gold'} rounded-lg px-4 pt-6 pb-2 text-ivory text-base focus:outline-none transition-colors duration-300 peer resize-none`}
        />
        <label className="absolute left-4 top-2 text-grain/60 text-xs uppercase tracking-wider font-mono transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold pointer-events-none">
          Contanos tu idea o proyecto...
        </label>
        {errors.mensaje && (
          <span className="text-red-500 text-xs block mt-1 font-mono">{errors.mensaje.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 bg-gold hover:bg-gold-muted text-void font-display font-medium text-lg rounded-lg transition-all duration-500 hover:shadow-[0_0_25px_rgba(201,168,76,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
      </button>
    </form>
  )
}
