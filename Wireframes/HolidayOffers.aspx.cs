using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ektron.Cms.Common;
using Ektron.Cms.Content;
using Ektron.Cms.Framework.UI.Controls;
using NewDevTraining;

public partial class Source_Wireframes_HolidayOffers : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        GetHolidayList();
    }
    private void GetHolidayList()
    {
        ContentTypeManager<HolidayOffers> holidayOfferManager = new ContentTypeManager<HolidayOffers>();
        string folderid = Resources.ID.HolidayOfferFolderId;
        long holidayFolderId = 0;
        bool isFolderId = long.TryParse(folderid, out holidayFolderId);
        if (isFolderId)
        {
            ContentCriteria criteria = new ContentCriteria();
            criteria.AddFilter(ContentProperty.FolderId, CriteriaFilterOperator.EqualTo, holidayFolderId);

            List<ContentType<HolidayOffers>> holidayOffers = holidayOfferManager.GetList(criteria);
            lstOffers.DataSource = holidayOffers;
            lstOffers.DataBind();
        }
    }
}
