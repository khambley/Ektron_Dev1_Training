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


public partial class Source_Wireframes_EditProfile : BaseTemplate
{
    private UserManager userManager = new UserManager(ApiAccessMode.Admin);
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            UserData userToEdit = userManager.GetItem(Ektron.Cms.CommonApi.Current.UserId, true);

            if (userToEdit != null && Ektron.Cms.CommonApi.Current.UserId != 0)
            {
                // Set all of the field values to the current user's details
                txtFirstName.Text = userToEdit.FirstName;
                txtLastname.Text = userToEdit.LastName;
                txtEmail.Text = userToEdit.Email;
                txtPhone.Text = userToEdit.CustomProperties["Phone"].Value.ToString();
                ((DropDownList)ddlCountrylist).SelectedValue = userToEdit.CustomProperties["Country"].Value.ToString();
                txtUsername.Text = userToEdit.Username;
                txtPassword.Attributes.Add("value", userToEdit.Password);
            }

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
        Page.Validate();
        if (Page.IsValid)
        {
            //try
            //{
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
            UserData userToEdit = umanager.GetItem(Ektron.Cms.CommonApi.Current.UserId, true);

            userToEdit.FirstName = userToCreate.FirstName;
            userToEdit.LastName = userToCreate.LastName;
            userToEdit.Email = userToCreate.Email;
            userToEdit.CustomProperties["Phone"].Value = userToCreate.CustomProperties["Phone"].Value;
            userToEdit.CustomProperties["Country"].Value = userToCreate.CustomProperties["Country"].Value;
            userToEdit.CustomProperties["Time Zone"].Value = userToCreate.CustomProperties["Time Zone"].Value;
            userToEdit.Username = userToCreate.Username;
            userToEdit.Password = userToCreate.Password;
            userToEdit.DisplayName = userToCreate.Email;

            umanager.Update(userToEdit);

            if (userToEdit.Id != 0)
            {
                divRegistrationwrapper.Visible = false;
                litErrorMsg.Text = "<br /><br />" + Resources.Text.UserCreatedSuccess + "<br /><br />";
            }
            else
            {
                litErrorMsg.Text = Resources.Text.UserCreatedFail;
            }
            //}

            //catch (Exception ex)
            //{
            //    litErrorMsg.Text = Resources.Text.UserCreatedFail;
            //}
        }
    }

}