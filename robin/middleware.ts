export {default} from "next-auth/middleware";


// 
/* 
Defined protected routes array for the middleware
-----------------------------------------------
You can also use wildcard to match rounds
e.g. ['/user/*'] will match all routes that starts with /user/
-----------------------------------------------
// *: zero or more
// ?: zero or one
// +: one or more
*/
export const config = {
  matcher:['/'] // =
}
