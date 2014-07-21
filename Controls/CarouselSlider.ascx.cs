using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ektron.Cms;
using Ektron.Cms.API;
using Ektron.Cms.Framework.Content;
using NewDevTraining;

public partial class Source_Controls_CarouselSlider : BaseUserControl
{
    private ContentManager contentManager = new ContentManager();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) {
            if (ContentId > 0) {
                ContentData homePage = contentManager.GetItem(ContentId, true);
                if(homePage != null && homePage.MetaData != null) {
                    foreach (ContentMetaData metaItem in homePage.MetaData) {
                        if(metaItem.Name == "Carousel") {
                            long carouselContentId = 0;
                            long.TryParse(metaItem.Text, out carouselContentId);
                            FillCarousel(carouselContentId);
                        }
                    }
                }
            }
        }
    }
    private void FillCarousel(long carouselContentId) {
        ContentTypeManager<Carousel> carouselManager = new ContentTypeManager<Carousel>();
        ContentType<Carousel> carouselItem = carouselManager.GetItem(carouselContentId, false);
        if (carouselItem != null) {
            lstThumbnailIcon.DataSource = carouselItem.SmartForm.CarouselItem;
            lstThumbnailIcon.DataBind();

            lstSliderFigure.DataSource = carouselItem.SmartForm.CarouselItem;
            lstSliderFigure.DataBind();
        }
    }
}