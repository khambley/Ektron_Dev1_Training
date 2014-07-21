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
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (ContentId != 0)
            {
                ContentManager contentManager = new ContentManager();
                ContentData registerIntro = contentManager.GetItem(ContentId, false); if (registerIntro != null)
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
        }
    }
}