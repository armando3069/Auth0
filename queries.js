const statement_Insert = "INSERT INTO auth (username,password,email) VALUES($1,$2,$3)";
const statement_Select = "SELECT password from auth where username = $1";

module.exports= 
{
  statement_Insert,
  statement_Select
}