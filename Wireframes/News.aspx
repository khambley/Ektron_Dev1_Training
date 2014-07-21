<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/MainMasterFixed.master" AutoEventWireup="true" CodeFile="News.aspx.cs" Inherits="Source_Wireframes_News" %>

<%@ Register Src="~/Source/Controls/SectionalMenu.ascx" TagPrefix="uc1" TagName="SectionalMenu" %>


<asp:Content ID="Content1" ContentPlaceHolderID="cphPageHost" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
    <div class="container">
            <div class="row ektron-large-vertical-padding ektron-mega-top-padding">
                <div class="span4 hidden-phone">

		<!-- Sectional Menu -->
                    <uc1:SectionalMenu ID="SectionalMenu1" runat="server" MasterControlId="Menu1" />
		<!-- End Sectional Menu -->

                </div>
                <div class="span8 ektron-content">
                    <!-- Start of Content Section -->
                    <div class="ektron-large-bottom-margin">
                        <h1>
                            <%=Resources.Text.News %>
			            </h1>
		<!-- News List Items -->                            
                        <asp:ListView runat="server" ID="lstNews" ItemPlaceholderID="phNewsItems">
                            <LayoutTemplate>
                                <span class="ektron-body-grey">
                                <div class="content">
                                    <asp:PlaceHolder ID="phNewsItems" runat="server"></asp:PlaceHolder>
                                </div>
                                </span>
                            </LayoutTemplate>
                            <ItemTemplate>
                                <div class="ektron-inner-shadow-bottom ektron-large-vertical-padding">
                                    <div class="ektron-float-container">
                                        <div class="ektron-pull-left">
                                            <a href='<%#Eval("Content.Quicklink") %>'><%#Eval("Smartform.Title").ToString()%></a>
                                        </div>
                                        <div class="ektron-pull-right ektron-smaller">
                                            <%#GetLongDate(Eval("Smartform.Date").ToString())%>
                                        </div>
                                    </div>
                                    <div class="ektron-med-vertical-padding">
                                        <%#((NewDevTraining.rich)Eval("Smartform.Summary")).ToString()%>
                                    </div>
                                 </div>
                            </ItemTemplate>
                        </asp:ListView>    
 		<!-- End News List Items -->                    
                    </div>
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

