using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using NewDevTraining;

public partial class Source_Wireframes_SearchResults : BaseTemplate
{
    protected void Page_PreRender(object sender, EventArgs e)
    {
        if (!IsPostBack) 
        {
            if (!string.IsNullOrEmpty(Request.QueryString["query"])) 
            {
                string searchQuery = Server.UrlDecode(Request.QueryString["query"];

                SiteSearchController1.Search(searchQuery);
            }
        }
    }
}