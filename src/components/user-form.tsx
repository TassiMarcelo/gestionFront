'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Modal from './Modal'
import type { User } from '../types/user'

interface UserFormProps {
  user?: User | null
  onSave: (user: User) => void
  onCancel: () => void
}

export function UserForm({ user, onSave, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      cuil: '',
      email: '',
      nombre: '',
      empresa: '',
      descripcion: '',
      preferencia: false,
      usuario: '',
      password: ''
    }
  )

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as User)
  }

  const handleCancel = () => {
    setIsCancelModalOpen(true);
  }

  const confirmCancel = () => {
    setIsCancelModalOpen(false);
    onCancel();
  }

  const cancelCancel = () => {
    setIsCancelModalOpen(false);
  }

  return (
    <>
      {/* Contenedor para centrar el formulario con un tamaño más pequeño */}
      <div className="flex justify-center items-center fixed inset-0 z-10">
        <div className="w-full max-w-[425px] max-h-[95vh] bg-white p-4 rounded-md shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4 mt-0">
          <div className="grid gap-2">
  <Label htmlFor="nombre">Nombre Completo</Label>
  <Input
    id="nombre"
    value={formData.nombre}
    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
    onKeyPress={(e) => {
      // Permite solo letras y espacios
      if (!/[a-zA-Z\s]/.test(e.key)) {
        e.preventDefault(); // Evita que se ingrese un carácter no permitido
      }
    }}
    required
  />
</div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="empresa">Empresa</Label>
              <Input
                id="empresa"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
  <Label htmlFor="cuil">CUIL</Label>
  <Input
    id="cuil"
    value={formData.cuil}
    onChange={(e) => setFormData({ ...formData, cuil: e.target.value })}
    onKeyPress={(e) => {
      // Solo permite números
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault(); // Evita que se ingrese un carácter no numérico
      }
    }}
    required
  />
</div>
            <div className="grid gap-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                value={formData.usuario}
                onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!user}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Input
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="preferencia"
                checked={formData.preferencia}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, preferencia: checked as boolean })
                }
              />
              <Label htmlFor="preferencia">Preferencia</Label>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit">
                {user ? 'Guardar cambios' : 'Crear usuario'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal que aparece sobre el formulario */}
      <Modal isOpen={isCancelModalOpen} onClose={cancelCancel}>
        <div className="z-50">
          <h2>¿Estás seguro de que deseas cancelar la creación del usuario?</h2>
          <div className="flex justify-between gap-4 mt-4">
            <Button onClick={cancelCancel} variant="outline">
              No
            </Button>
            <Button onClick={confirmCancel} variant="destructive">
              Sí
            </Button>
          </div>
        </div>
      </Modal> 
    </>
  )
}
