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
using System.IO;
using Ektron.Cms.Content;
using System.Data;
using System.Xml;
using System.Xml.Linq;

public partial class Source_Wireframes_Pagination : BaseTemplate
{
    protected void Page_Load(object sender, EventArgs e)
    {
        BindCountry();
    }
    public void btnBookHoliday_Click(object sender, EventArgs e)
    {
        Page.Validate();
        Holiday holiday = new Holiday();
        holiday.FirstName = txtFirstName.Text;
        holiday.LastName = txtLastName.Text;
        holiday.Email = txtEmail.Text;
        holiday.Phone = txtPhone.Text;
        holiday.HolidayType = RadioHolidayType.SelectedValue;
        holiday.HolidayCountry = ddlCountries.SelectedValue;
        holiday.HolidayDate = clndrHolidayDate.SelectedDate.ToString();
        holiday.Comments = tbComments.Text;

        ContentTypeManager<Holiday> contentTypeManager = new ContentTypeManager<Holiday>();
        ContentType<Holiday> newHoliday = new ContentType<Holiday>();
        newHoliday.Content = new ContentData();
        newHoliday.Content.FolderId = 102;
        newHoliday.Content.Title = holiday.FirstName + "-" + holiday.HolidayCountry + "-" + holiday.HolidayDate;
        newHoliday.SmartForm = holiday;
        // adds content to the CMS
        contentTypeManager.Add(newHoliday);
        Response.Redirect("/Source/Wireframes/Pagination.aspx");
    }
    private void BindCountry()
    {
        XmlDocument doc = new XmlDocument();
        doc.Load(Server.MapPath("~/Workarea/ContentDesigner/countries.xml"));
        XmlNodeList list = doc.GetElementsByTagName("option");
        foreach (XmlNode node in list)
        {
            ListItem listItem = new ListItem(node.InnerText, node.Attributes["value"].Value);
            ddlCountries.Items.Add(listItem);
        }
    }
}