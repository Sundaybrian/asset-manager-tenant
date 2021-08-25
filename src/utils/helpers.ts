import defaultRoutes from '../routes';

/* eslint-disable eqeqeq*/
// export interface CompanyResponse{
//     name:string;
//     owner_id: number;
// }

// export interface UserResponse {
// 	id: number;
// 	first_name: string;
// 	last_name: string;
// 	email: string;
// 	role: string;
//     company?:CompanyResponse
// }

export default function getDashboardRoutes(role) {
  // TODO make sure not other user type accesses this
  if (role === 'merchant') {
    return defaultRoutes;
  } else {
    return [];
  }
}
