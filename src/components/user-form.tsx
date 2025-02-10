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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validación de datos (por ejemplo, para asegurarse de que la contraseña cumpla los requisitos)
    if (errorMessage) {
      return; // Si hay un mensaje de error en la contraseña, no enviamos el formulario
    }
  
    try {
      const response = await fetch('http://localhost:8080/usuarios/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuil: formData.cuil,
          email: formData.email,
          nombre: formData.nombre,
          empresa: formData.empresa,
          descripcion: formData.descripcion,
          preferencia: formData.preferencia,
          usuario: formData.usuario,  // Asegúrate de enviar "usuario" como el nombre de campo
          password: formData.password,  // Enviar la contraseña sin encriptar
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        onSave(data.data); // Llamar a la función onSave pasando los datos que devuelve el backend
      } else {
        alert('Error al registrar usuario: ' + data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Hubo un problema con la conexión');
    }
  };
  
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

  const [errorMessage, setErrorMessage] = useState('');

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const password = e.target.value;
  setFormData({ ...formData, password });
  
  // Validación básica (puedes mejorarlo con regex o librerías adicionales)
  if (password.length < 8) {
    setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
  } else if (!/[A-Z]/.test(password)) {
    setErrorMessage('La contraseña debe contener al menos una letra mayúscula.');
  } else if (!/[0-9]/.test(password)) {
    setErrorMessage('La contraseña debe contener al menos un número.');
  } else if (!/[!@#$%^&*]/.test(password)) {
    setErrorMessage('La contraseña debe incluir un carácter especial (!@#$%^&*)');
  } else {
    setErrorMessage('');
  }
};

  return (
    <>
<div className="flex justify-center items-center fixed inset-0 z-10">
<div className={`w-full max-w-[425px] max-h-[95vh] bg-white p-4 rounded-md shadow-lg ${errorMessage ? 'scroll-hidden' : ''}`}>
<form onSubmit={handleSubmit} className="space-y-4 mt-0 flex flex-col min-h-full">          <div className="grid gap-2">
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
      onChange={handlePasswordChange}
      required={!user}
      minLength={8}
      maxLength={20}
      pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,:\-])[A-Za-z0-9!@#$%^&*.,:\-]{8,20}$"
      title="La contraseña debe tener entre 8 y 20 caracteres, incluir al menos una letra mayúscula, un número y un carácter especial."
    />
    {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
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
            <div className="flex justify-end space-x-4 mt-4"> {/* Aquí cambiamos space-x-4 por space-x-2 */}
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                  {user ? 'Guardar cambios' : 'Crear usuario'}
            </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal que aparece sobre el formulario */}
      <Modal isOpen={isCancelModalOpen} onClose={cancelCancel}>
        <div className="z-50">
          <h2>{user ? "¿Estás seguro de que deseas cancelar la edición del usuario?" : "¿Estás seguro de que deseas cancelar la creación del usuario?"}
          </h2>
          <div className="flex justify-center gap-2 mt-4 space-x-16">
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
