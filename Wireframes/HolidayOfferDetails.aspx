<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/MainMasterFixed.master" AutoEventWireup="true" CodeFile="HolidayOfferDetails.aspx.cs" Inherits="Source_Wireframes_HolidayOfferDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphPageHost" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
    <div class="container">
        <div class="row ektron-large-vertical-padding ektron-mega-top-padding">
            <div class="span4 hidden-phone">
		<!-- Sectional Menu -->
    
		<!-- End Sectional Menu -->
            </div>
            <div class="span8 ektron-content">
                <a href="/HolidayOffers/">Return to Offers</a>
                <h1>
                <%=Title %>
				</h1>
                <p>
                <%=Date %>
				</p>
                <%=BodyText %>
            </div>
            <div style="float: left;">
                <img src="<%=ImgSource %>" style="height: 200px;" alt="Image" />
            </div>
        </div>
    </div>
    <!-- Grey Footer Section -->
    <div class="ektron-black-texture ektron-mega-top-padding ektron-huge-bottom-padding">
        <div class="container">
            <div class="row">
                <div>
                    <div class="ektron-940-huge-horizontal-margin ektron-724-float-widgets-50">
		<!-- Content Footer Menu -->
  
		<!-- End Content Footer Menu -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

