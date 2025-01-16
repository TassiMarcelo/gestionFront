'use client'

import { useState } from 'react'
import { Eye, Pencil, Trash2, Search, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { UserForm } from './user-form'
import { UserView } from './user-view'
import type { User } from '../types/user'

const initialUsers: User[] = [
  {
    id: '1',
    cuil: '203232323230',
    email: 'usuario@ejemplo.com',
    nombre: 'Juan Pérez',
    empresa: 'Empresa A',
    descripcion: 'Usuario de prueba',
    preferencia: true,
    usuario: 'jperez',
    password: '********'
  },
  // Añade más usuarios aquí
]

export function UserTable() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showView, setShowView] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(user => 
    Object.values(user).some(value => 
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  )

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setShowForm(true)
  }

  const handleView = (user: User) => {
    setSelectedUser(user)
    setShowView(true)
  }

  const handleSave = (user: User) => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === user.id ? user : u))
    } else {
      setUsers([...users, { ...user, id: Date.now().toString() }])
    }
    setShowForm(false)
    setSelectedUser(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Crear usuario
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cuil</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Preferencia</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.cuil}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.empresa}</TableCell>
                <TableCell>{user.descripcion}</TableCell>
                <TableCell>
                  <Checkbox checked={user.preferencia} disabled />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(user)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showForm && (
        <UserForm
          user={selectedUser}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setSelectedUser(null)
          }}
        />
      )}

      {showView && selectedUser && (
        <UserView
          user={selectedUser}
          onClose={() => {
            setShowView(false)
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}

