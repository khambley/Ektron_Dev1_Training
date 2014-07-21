using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using NewDevTraining;

public partial class Source_Master_Pages_NoSearchMaster : BaseMaster
{
    protected void Page_Init(object sender, EventArgs e) {

        if (!IsPostBack) {
            long mainMenuId = 0;
            long.TryParse(Resources.ID.MainMenuId, out mainMenuId);
            if (mainMenuId > 0)
            {
                Menu1.MenuId = mainMenuId;
            }
        }
        
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        RegisterCSS();
        RegisterJs();
    }
    private void RegisterCSS() {
        Ektron.Cms.API.Css.RegisterCss(this, "/source/css/bootstrap.min/5.css", "TrainingCss5", true);
        Ektron.Cms.API.Css.RegisterCss(this, "/source/css/7.css", "TrainingCss7", true);
        Ektron.Cms.API.Css.RegisterCss(this, "/source/css/8.css", "TrainingCss8", true); 
        Ektron.Cms.API.Css.RegisterCss(this, "/source/css/9.css", "TrainingCss9", true); 
        Ektron.Cms.API.Css.RegisterCss(this, "/source/css/ektron.less.css", "TrainingCssLess", true);
        Ektron.Cms.API.Css.RegisterCss(this, "/source/css/ektron.css", "css_ektron", true);

    }
    private void RegisterJs() {
        Ektron.Cms.API.JS.RegisterJS(this, Ektron.Cms.API.JS.ManagedScript.EktronJS); 
        Ektron.Cms.API.JS.RegisterJS(this, "/source/js/jquery.easing-1.3.min.js", "js_easing", true);
        Ektron.Cms.API.JS.RegisterJS(this, "/source/js/1.js", "TrainingJs1", true);
        Ektron.Cms.API.JS.RegisterJS(this, "/source/js/2.js", "TrainingJs2", true); 
        Ektron.Cms.API.JS.RegisterJS(this, "/source/js/3.js", "TrainingJs3", true); 
        Ektron.Cms.API.JS.RegisterJS(this, "/source/js/4.js", "TrainingJs4", true); 
        Ektron.Cms.API.JS.RegisterJS(this, "/source/js/tabcontent.js", "js_tabs", true);
    }
    protected void btnSearchPhone_Click(object sender, EventArgs e) { 
        Response.Redirect("/search/?query=" + Server.UrlEncode(txtSearch.Text)); 
    } 
    protected void btnSearch_Click(object sender, System.Web.UI.ImageClickEventArgs e) { 
        Response.Redirect("/search/?query=" + Server.UrlEncode(txtSearch.Text)); 
    }
}
