<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/MainMaster.master" AutoEventWireup="true" CodeFile="home.aspx.cs" Inherits="Source_Wireframes_home" %>

<%@ Register Assembly="Ektron.Cms.Widget" Namespace="Ektron.Cms.PageBuilder" TagPrefix="PB" %>
<%@ Register Src="~/Workarea/PageBuilder/PageControls/PageHost.ascx" TagPrefix="uc1" TagName="PageHost" %>
<%@ Register Src="~/Workarea/PageBuilder/PageControls/DropZone.ascx" TagPrefix="uc1" TagName="DropZone" %>

<%@ Register src="../Controls/CarouselSlider.ascx" tagname="CarouselSlider" tagprefix="uc2" %>



<asp:Content ID="Content1" ContentPlaceHolderID="cphPageHost" Runat="Server">
    <uc1:PageHost runat="server" ID="PageHost" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
    <!-- Start Carousel -->
    <script type="text/javascript">
        Ektron.ready(function (event, eventName) {
            Ektron.PFWidgets.EktronMobileSlider.init({ ContainerID: 'divswipecontainer', SwipeID: 'swipeux', GalleryEnabled: true, InitColorLeft: 'ffffff', InitColorRight: 'ffffff' });
        });
    </script>
    <div class="container">
        <div class="row">
            <div class="span12">
                <div class="content">
                    <div id="divswipecontainer" class="ektron-swipe-container">
			<!-- Carousel Control -->
                <uc2:CarouselSlider ID="CarouselSlider1" runat="server" />
			<!-- End Carousel Control --> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ektron-grey-gradient-vertical-offset ektron-inner-shadow-bottom">
        <div class="container ektron-med-vertical-padding">
            <div class="row">
                <div class="span6 ektron-med-vertical-margin ektron-460-half">
			<!-- Request Call Drop Zone -->
                    <uc1:DropZone runat="server" ID="dzRequestCall">
                        <ColumnDefinitions>
                            <PB:ColumnData columnID="1" width="100" unit="percent" />
                        </ColumnDefinitions>
                    </uc1:DropZone>
			<!-- End Request Call Drop Zone -->
                </div>
                <div class="span6 ektron-med-vertical-margin ektron-460-half">
			<!-- Hot Deals Drop Zone -->
                <uc1:DropZone runat="server" ID="dzHotDeals">
                        <ColumnDefinitions>
                            <PB:ColumnData columnID="1" width="100" unit="percent" />
                        </ColumnDefinitions>
                    </uc1:DropZone>
			<!-- End Hot Deals Drop Zone -->
                </div>
            </div>
        </div>
        <div class="container ektron-large-vertical-padding ektron-mega-bottom-padding hidden-phone">
            <div class="row">
                <div class="span8 ektron-content">
                    <div class="ektron-large-bottom-margin">
			<!-- Content Area Drop Zone -->
                <uc1:DropZone runat="server" ID="DropZone1">
                        <ColumnDefinitions>
                            <PB:ColumnData columnID="1" width="100" unit="percent" />
                        </ColumnDefinitions>
                    </uc1:DropZone>
			<!-- End Content Area Drop Zone -->
                    </div>
                </div>
                <div class="span4 ektron-auto-medium-vertical-padding">
			<!-- Right Hand Area Drop Zone -->
                    <uc1:DropZone runat="server" ID="dzRight">
                        <ColumnDefinitions>
                            <PB:ColumnData columnID="1" width="100" unit="percent" />
                        </ColumnDefinitions>
                    </uc1:DropZone>
			<!-- End Right Hand Area Drop Zone -->
                </div>
            </div>
        </div>
    </div>
</asp:Content>

