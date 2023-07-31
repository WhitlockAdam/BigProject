const app_name = "budget-manager-group14-bacfc735e9a2";

exports.buildPath =
function buildPath(route)
{

    if(process.env.NODE_ENV === "production")
    {
        return("https://" + app_name + ".herokuapp.com/" + route);
    }
    else
    {
        return "http://localhost:5000/" + route;
    }

}