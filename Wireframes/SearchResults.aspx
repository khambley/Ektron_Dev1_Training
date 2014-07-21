<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/NoSearchMaster.master" AutoEventWireup="true" CodeFile="SearchResults.aspx.cs" Inherits="Source_Wireframes_SearchResults" %>

<%@ Register Assembly="Ektron.Cms.Framework.UI.Controls.EktronUI" Namespace="Ektron.Cms.Framework.UI.Controls.EktronUI" TagPrefix="ektronUI" %>

<%@ Register Assembly="Ektron.Cms.Framework.UI.Controls" Namespace="Ektron.Cms.Framework.UI.Controls" TagPrefix="cc1" %>

<%@ Register Src="~/Workarea/PageBuilder/PageControls/DropZone.ascx" TagPrefix="uc1" TagName="DropZone" %>


<asp:Content ID="Content1" ContentPlaceHolderID="cphPageHost" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
    <div class="container">
            <div class="row ektron-large-vertical-padding ektron-mega-top-padding">
                <div class="span3 hidden-phone">
                    <!-- Left Navigation Area -->
 
                    <!-- End of Left Navigation Area -->
                </div>
                <div class="span7 ektron-content">
                    <!-- Start of Content Section -->
                    <div class="ektron-large-bottom-margin">
                   <!-- Dropzone Section -->
                        <h1><%=Resource.Text.SearchResults %></h1>
                        <cc1:SiteSearchController ID="SiteSearchController1" runat="server">
                        </cc1:SiteSearchController>
                        <cc1:SiteSearchInputView ID="SiteSearchInputView1" ControllerID="SiteSearchController1" runat="server">
                        </cc1:SiteSearchInputView>
                        <cc1:SiteSearchResultsView ID="SiteSearchResultsView1" ControllerID="SiteSearchController1" runat="server">
                        </cc1:SiteSearchResultsView>
                        <ektronUI:Pager ID="Pager1" PageableControlID="SiteSearchController1" ResultsPerPage="10" runat="server">

                        </ektronUI:Pager>
                   <!-- End Dropzone Section -->
                    </div>
                </div>
                <div class="span2">
                   <!-- Right Hand Column Section -->

                   <!-- End Right Hand Column Section -->
                </div>
            </div>
        </div>
     <!-- Grey Footer Section -->
    <div class="ektron-black-texture ektron-mega-top-padding ektron-huge-bottom-padding">
        <div class="container">
            <div class="row">
                <div>
                    <div class="ektron-940-huge-horizontal-margin ektron-724-float-widgets-50">
                   <!-- Footer Section -->
 
                   <!-- End Footer Section -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End of Grey Footer Section -->
</asp:Content>

