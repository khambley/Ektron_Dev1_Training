using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ektron.Cms.Common;
using Ektron.Cms.Content;
using Ektron.Cms.Framework.Content;
using Ektron.Cms.Framework.UI.Controls;
using NewDevTraining;

public partial class Source_Wireframes_News : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        GetNewsList();
    }
    public string GetLongDate(string Date)
    {
        DateTime d = Convert.ToDateTime(Date);
        string format = "dddd,MMMM dd,yyyy";
        string newsdate = d.ToString(format);
        return newsdate;
    }
    private void GetNewsList()
    {
        ContentTypeManager<NewDevTraining.News> newsManager = new ContentTypeManager<NewDevTraining.News>();
        ContentManager cMgr = new ContentManager();
        ContentTaxonomyCriteria criteria = new ContentTaxonomyCriteria();
        criteria.AddFilter(ContentTaxonomyProperty.Id, CriteriaFilterOperator.EqualTo, 91);
        List<ContentType<NewDevTraining.News>> contentDataList = newsManager.GetList(criteria);
        lstNews.DataSource = contentDataList;
        lstNews.DataBind();
    }
}