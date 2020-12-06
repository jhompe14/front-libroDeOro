import { HOST } from "./host";

//Method HTTP
export const METHOD_POST = "POST";
export const METHOD_PUT = "PUT";
export const METHOD_DELETE = "DELETE";

//URL
export const HOST_URL_BACK= HOST;
export const API_GRUPOS = "api/grupo";
export const API_CARGOS = "api/cargo"; 
export const API_RAMAS = "api/rama";
export const API_SECCIONES = "api/seccion";
export const API_AUTH = "api/auth";
export const API_USUARIOS = "api/usuario";
export const API_ANECDOTA = "api/anecdota";

//Type Cargo
export const TYPE_CARGO_GRUPO = "GR";
export const TYPE_CARGO_RAMA = "RA";
export const TYPE_CARGO_SECCION = "SE";

//Type Usuario
export const TYPE_USUARIO_ADMINISTRADOR = "AD";
export const TYPE_USUARIO_INTEGRANTE = "IN";

//Type Integrante
export const TYPE_INTEGRANTE_ACTIVO = "AC";
export const TYPE_INTEGRANTE_EX_INTEGRANTE = "EX";

//Type Buttons usuario
export const TYPE_FORM_CREATE="CR";
export const TYPE_FORM_UPDATE="UP";

//Type estado anecdota
export const TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION="PA";
export const TYPE_ESTADO_ANECDOTA_APROBADO="AP";
export const TYPE_ESTADO_ANECDOTA_RECHAZADO="RE";
export const TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION="PM";

export const TYPE_VISUALIZACION_PUBLICO="PL";
export const TYPE_VISUALIZACION_PRIVADO="PR";