using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ektron.Cms.Framework.Organization;
using Ektron.Cms.Organization;
using NewDevTraining;

public partial class Source_Controls_FooterSocialMenu : BaseUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            FillMenu();  
        }
    }
    private void FillMenu()
    {
        MenuManager menuManager = new MenuManager();
        long menuId = 0;
        long.TryParse(Resources.ID.FooterSocialMenuId, out menuId);
        MenuData menuData = menuManager.GetTree(menuId);

        SocialMenu.DataSource = menuData.Items;
        SocialMenu.DataBind();

    }
}