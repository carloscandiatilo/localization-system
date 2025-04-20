export const ValidationMessages = {
  // Mensagens gerais
  GENERIC_ERROR: 'Ocorreu um erro inesperado.',
  VALIDATION_ERROR: 'Erro de validação: ',
  DUPLICATE_RECORD: 'Este Registo já existe no sistema!',
  RECORD_NOT_FOUND: 'Registo não encontrado.',
  RECORD_FOUND: 'Registo encontrado.',
  INVALID_DATE: 'Dados inválidos.',
  FIELD_NOT_FOUND: "O campo '{campo}' não existe na entidade '{entidade}'.",
  
  // Mensagens de autenticação
  EMAIL_INVALID: 'E-mail inválido.',
  PASSWORD_MIN_LENGTH: 'A senha deve ter no mínimo 6 caracteres.',
  CREDENTIALS_INVALID: 'Credencial errada.',
  EMAIL_IN_USE: 'E-mail já está em uso.',
  USERNAME_IN_USE: 'Nome de usuário já está em uso.',
  USER_NOT_FOUND: 'Usuário não encontrado.',
  INVALID_CREDENTIAL: 'Credenciais inválidas.',
  USER_NOT_AUTHENTICATED: 'Usuário não autenticado.',
  PROFILE_UPDATE_REQUIRED: 'Você precisa atualizar seu perfil para ter acesso à sua conta!',
  
  // Mensagens de sucesso
  SIGNUP_SUCCESS: 'Cadastro realizado com sucesso!',
  LOGIN_SUCCESS: 'Login bem-sucedido',
  LIST_RETURNED_SUCCESSFULLY: 'Lista retornada com sucesso.',
  RECORD_UPDATED_SUCCESSFULLY: 'Registo atualizado com sucesso.',
  RECORD_CREATED_SUCCESSFULLY: 'Registo criado com sucesso.',
  RECORD_SOFT_DELETE_SUCCESS: 'Registo excluído com sucesso!',
  RECORD_HARD_DELETE_SUCCESS: 'Registo excluído permanentemente.',
  RECORD_RESTORE_SUCCESS: 'Registo restaurado com sucesso.',
  USER_CHANGED_SUCCESSFULLY: 'Usuário atualizado com sucesso!',
  RECORD_HARD_DELETE_SUCCESS_WITH_NAME: 'Registo com {nome} excluído permanentemente.',
  
  // Mensagens de roles/perfis
  ROLE_INVALID: 'Role inválida.',
  ROLE_NOT_FOUND: 'Perfil não encontrado',
  ROLE_ASSIGNED: 'Perfil ${role.nome} atribuído ao usuário ${user.username}',
  
  // Mensagens de chaves estrangeiras
  INVALID_FOREIGN_KEY: "O valor inserido na coluna '{entidadeNome}' não existe!",
  FOREIGN_KEY_NOT_FOUND: "O {entidadeNome} com ID {id} não existe.",
  
  // Mensagens de restrições
  CANNOT_CHANGE_PROFILE: 'Você não pode editar outro usuário!',
  RECORD_SOFT_DELETED: 'Este Registo já foi excluído.',
  
  // Mensagens de documentos (BI, Passaporte, Outros)
  DOCUMENT: {
    INVALID_TYPE: 'O tipo de documento deve ser: Bilhete de Identidade, Passaporte ou Outro.',
    TYPE_REQUIRED: 'O tipo de documento é obrigatório.',
    MASK_REQUIRED: 'A máscara de preenchimento é obrigatória.',
    MASK_INVALID_STRING: 'A máscara de preenchimento deve ser uma string.',
    
    BI: {
      INVALID_MASK: 'Para Bilhete de Identidade, a máscara deve ter 9 números + 2 letras + 3 números (ex: 123456789LA123)',
      INVALID_VALUE: 'Para BI, o valor deve conter 9 números, 2 letras e 3 números (ex: 123456789LA123).'
    },
    
    PASSPORT: {
      INVALID_MASK: 'Para Passaporte, a máscara deve ter 1-2 letras seguidas de 6-10 números (ex: N1234567 ou AB12345678)',
      INVALID_VALUE: 'Para Passaporte, deve iniciar com uma letra e conter de 6 a 10 números (ex: A123456).'
    },
    
    OTHER: {
      INVALID_MASK: 'Para outros documentos, a máscara deve ter no máximo 20 caracteres',
      INVALID_VALUE: 'Para documentos do tipo "Outro", o valor deve ter no máximo 20 caracteres.'
    }
  },
  
  // Mensagens técnicas
  USER_FETCH_ERROR: 'Erro ao buscar usuário com role.',
  PASSWORD_HASH_ERROR: 'Erro ao gerar hash da senha.',
  EMAIL_ALREADY_EXISTS: 'Esse e-mail já existe no sistema.'
};