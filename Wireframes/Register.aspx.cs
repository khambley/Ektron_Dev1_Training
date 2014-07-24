using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ektron.Cms;
using Ektron.Cms.Framework;
using Ektron.Cms.Framework.Content;
using Ektron.Cms.Framework.User;
using NewDevTraining;


public partial class Source_Wireframes_Register : BaseTemplate
{
    private UserManager userManager = new UserManager(ApiAccessMode.Admin);
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (ContentId != 0)
            {
                ContentManager contentManager = new ContentManager();
                ContentData registerIntro = contentManager.GetItem(ContentId, false);
                if (registerIntro != null)
                {
                    litTitle.Text = registerIntro.Title;
                    litContent.Text = registerIntro.Html;
                }
            }
        }

    }

    protected void btncreateaccount_Click(object sender, EventArgs e)
    {
        UserData newUser = new UserData();
        try
        {
            string emailAddress = txtEmail.Text;
            if (!string.IsNullOrEmpty(emailAddress))
            {
                try
                {

                    System.Net.Mail.MailAddress addr = new System.Net.Mail.MailAddress(emailAddress);
                }
                catch
                {
                    litErrorMsg.Text = "Please Enter Valid Email Address.";
                    return;
                }
            }
            UserData userToCreate = new UserData()
            {
                Username = txtUsername.Text,
                Password = txtPassword.Text,
                FirstName = txtFirstName.Text,
                LastName = txtLastname.Text,
                DisplayName = txtUsername.Text,
                Email = txtEmail.Text,
                IsMemberShip = true
            };
            userToCreate.CustomProperties = userManager.GetCustomPropertyList();
            userToCreate.CustomProperties["Phone"].Value = txtPhone.Text;
            userToCreate.CustomProperties["Country"].Value = ddlCountrylist.SelectedValue;
            userToCreate.CustomProperties["Time Zone"].Value = "GMT Standard Time";

            string userSubs = "";

            if (chkHotDeals.Checked)
                userSubs = Resources.ID.SubscriptionHotDealsId;

            if (chkNews.Checked)
                userSubs += "," + Resources.ID.SubscriptionNewsId;
            if (userSubs.StartsWith(","))
                userSubs = userSubs.Remove(0, 1);

            userToCreate.CustomProperties["Subscriptions"].Value = userSubs;

            Ektron.Cms.Framework.User.UserManager umanager = new UserManager();
            newUser = umanager.Add(userToCreate);

            if (newUser.Id != 0)
            {
                divRegistrationwrapper.Visible = false;
                litErrorMsg.Text = "<br /><br />" + Resources.Text.UserCreatedSuccess + "<br /><br />";
            }
            else
            {
                litErrorMsg.Text = Resources.Text.UserCreatedFail;
            }
        }

        catch (Exception ex)
        {
            litErrorMsg.Text = Resources.Text.UserCreatedFail;
        }

    }

}