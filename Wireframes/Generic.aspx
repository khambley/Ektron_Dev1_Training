<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/MainMaster.master" AutoEventWireup="true" CodeFile="Generic.aspx.cs" Inherits="Source_Wireframes_Generic" %>

<%@ Register Assembly="Ektron.Cms.Widget" Namespace="Ektron.Cms.PageBuilder" TagPrefix="PB" %>
<%@ Register Src="~/Workarea/PageBuilder/PageControls/PageHost.ascx" TagPrefix="uc1" TagName="PageHost"%>
<%@ Register Src="~/Workarea/PageBuilder/PageControls/DropZone.ascx" TagPrefix="uc1" TagName="DropZone" %>
<%@ Register Src="/Source/Controls/SectionalMenu.ascx" TagPrefix="uc1" TagName="SectionalMenu" %>


<asp:Content ID="Content1" ContentPlaceHolderID="cphPageHost" Runat="Server">
    <uc1:PageHost runat="server" ID="PageHost" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
    <div class="container">
            <div class="row ektron-large-vertical-padding ektron-mega-top-padding">
                <div class="span3 hidden-phone">
                    <!-- Left Navigation Area -->
                    
                    <!-- End of Left Navigation Area -->
                    <uc1:SectionalMenu ID="SectionalMenu1" runat="server" MasterControlId="Menu1" />
                    <uc1:DropZone ID="DropZone1" runat="server" AllowAddColumn="false" AllowColumnResize="true">
                        <ColumnDefinitions>
                            <PB:ColumnData columnID="1" width="100" unit="percent"></PB:ColumnData>
                        </ColumnDefinitions>
                    </uc1:DropZone>
                </div>
                <div class="span7 ektron-content">
                    <!-- Start of Content Section -->
                    <div class="ektron-large-bottom-margin">
                   <!-- Dropzone Section -->
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

