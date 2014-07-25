using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using NewDevTraining;

public partial class Source_Wireframes_HolidayOfferDetails : BaseTemplate
{
    protected string Title { get; set; }
    protected string Date { get; set; }
    protected string BodyText { get; set; }
    protected string ImgSource { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (ContentId != 0)
        {
            ContentTypeManager<HolidayOffers> offerManager = new ContentTypeManager<HolidayOffers>();
            ContentType<HolidayOffers> holidayContent = offerManager.GetItem(ContentId, false);

            if (holidayContent != null)
            {
                Title = holidayContent.SmartForm.Title;
                Date = holidayContent.Content.DateCreated.ToLongDateString();
                BodyText = holidayContent.SmartForm.BodyText.ToString();
                ImgSource = holidayContent.SmartForm.ImgSource;
            }
        }
    }
}