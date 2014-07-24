using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ektron.Cms.Framework;
using Ektron.Cms.Framework.Content;
using Ektron.Cms.Framework.User;
using NewDevTraining;
using System.IO;
using Ektron.Cms.Content;
using System.Xml;
using System.Xml.Linq;

public partial class Source_Wireframes_XMLImporter : BaseTemplate
{
    protected void btnUploadFile_Click(object sender, EventArgs e)
    {
        //check if a file is selected
        if (uploadAttachment.HasFile)
        {
            uploadAttachment.SaveAs(Server.MapPath("/UploadedXml/")
            + uploadAttachment.FileName.Split('.')[0]
            + Path.GetExtension(uploadAttachment.FileName));
            XElement document = XElement.Load(Server.MapPath("/UploadedXml/") + uploadAttachment.FileName);
            ContentTypeManager<Holiday> contentTypeManagerHoliday = new ContentTypeManager<Holiday>();
            foreach (var booking in document.Elements())
            {
                Holiday holiday = new Holiday();
                holiday.FirstName = booking.Element("customer").Element("firstname").Value;
                holiday.LastName = booking.Element("customer").Element("lastname").Value;
                holiday.Email = booking.Element("customer").Element("email").Value;
                holiday.Phone = booking.Element("customer").Element("phone").Value;
                holiday.HolidayType = booking.Element("holiday").Element("type").Value;
                holiday.HolidayCountry = booking.Element("holiday").Element("destination").Value;
                holiday.HolidayDate = booking.Element("holiday").Element("date").Value;
                holiday.Comments = booking.Element("holiday").Element("comments").Value;

                ContentType<Holiday> holidayContent = new ContentType<Holiday>();
                holidayContent.Content = new Ektron.Cms.ContentData();
                holidayContent.Content.FolderId = 102;
                holidayContent.Content.Title = booking.Attribute("name").Value;
                holidayContent.SmartForm = holiday;

                contentTypeManagerHoliday.Add(holidayContent);

            }
            litMessage.Text = "Successfully added " + document.Elements().ToArray().Length + " items to the CMS";
        }
    }
}