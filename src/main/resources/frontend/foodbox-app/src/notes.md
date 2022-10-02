To send a parameter:

- navigate to certain route + parameter
--         this.router.navigate(['/editFood',food.id])
-- In this way, angular will bring the component with the parameter
   as defined in RouterModule (app.module)
- Once in the component, read the parameter using ActivatedRoute service.
-- when you read the parameter, at the same time trigger the service that'
   queries the database.

When quering the database
- Be careful to use the correct column names in the RowMapper.
- Also, make sure the parameters are the same type as returned.

