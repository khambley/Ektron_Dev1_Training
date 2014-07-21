using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using NewDevTraining;
using Ektron.Cms.Framework;

public partial class Source_Controls_NewsDetails : BaseTemplate
{
    protected string NewsTitle { get; set; }
    protected string NewsDate { get; set; }
    protected string NewsBodyText { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {
        if (ContentId != 0)
        {
            ContentTypeManager<NewDevTraining.News> newsManager = new ContentTypeManager<News>();
            ContentType<News> newsContent = newsManager.GetItem(ContentId, false);
            if (newsContent != null)
            {
                NewsTitle = newsContent.SmartForm.Title;
                NewsDate = newsContent.SmartForm.Date;
                NewsBodyText = newsContent.SmartForm.FullDescription.ToString();
            }
        }  
    }
}