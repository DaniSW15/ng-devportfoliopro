import { UserEntity } from '@core/domain/entities/user.entity';
import { AuthResponse } from '@core/interfaces/auth.interface';

/**
 * UserMapper - Transformador de datos de usuario.
 * Responsabilidad: convertir entre formatos sin lógica de negocio.
 * 
 * Flujo: AuthResponse (HTTP) → UserEntity (Dominio)
 */
export class UserMapper {
  /**
   * Convierte respuesta HTTP del backend a Entidad de Dominio.
   * @param response - JSON del backend
   * @returns UserEntity - Entidad pura del negocio
   */
  static fromHttpResponse(response: AuthResponse): UserEntity {
    return {
      id: response.user.id,
      email: response.user.email,
      name: response.user.name,
      avatarUrl: response.user.avatarUrl ?? '', // Manejo de null
      role: response.user.role,
    };
  }

  /**
   * Convierte Entidad a formato para persistencia (localStorage, DB, etc).
   * @param user - Entidad de dominio
   * @returns Objeto serializable
   */
  static toStorage(user: UserEntity): Record<string, unknown> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Reconstruye Entidad desde datos guardados.
   * @param data - Datos de storage
   * @returns UserEntity
   */
  static fromStorage(data: Record<string, unknown>): UserEntity {
    return {
      id: String(data['id']),
      email: String(data['email']),
      name: String(data['name']),
      avatarUrl: String(data['avatarUrl'] ?? ''),
      role: (data['role'] as 'user' | 'admin') ?? 'user',
    };
  }

  /**
   * Convierte Entidad a DTO para enviar al componente/UI.
   * @param user - Entidad de dominio
   * @returns Datos para mostrar en template
   */
  static toDisplayDTO(user: UserEntity): {
    displayName: string;
    initials: string;
    email: string;
    avatarUrl: string;
    role: string;
  } {
    const [firstName] = user.name.split(' ');
    const initials = user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return {
      displayName: firstName,
      initials,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role === 'admin' ? 'Administrador' : 'Usuario',
    };
  }
}