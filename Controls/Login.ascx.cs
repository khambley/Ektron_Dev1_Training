using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ektron.Cms;
using Ektron.Cms.Framework.User;
using NewDevTraining;

public partial class Source_Controls_Login : BaseUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void uxSubmit_Click(object sender, EventArgs e)
    {
        UserManager usermanager = new UserManager();
        if (!Ektron.Cms.Framework.Context.UserContextService.Current.IsLoggedIn)
        {
            UserData userdata = usermanager.Login(uxUserNametxt.Text, uxPasswordtxt.Text);
            if (userdata != null)
            {
                Response.Redirect("/home/");
            }
            else
            {
                uxMessage.Text = "Invalid UserName or Password!";
            }
        }
        else
        {
            uxMessage.Text = "User:" + usermanager.RequestInformation.LoggedInUsername + " is already Logged In";
        }
    }

}