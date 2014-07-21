<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/MainMasterFixed.master" AutoEventWireup="true" CodeFile="NewsDetails.aspx.cs" Inherits="Source_Controls_NewsDetails" %>

<%@ Register Src="~/Source/Controls/SectionalMenu.ascx" TagPrefix="uc1" TagName="SectionalMenu" %>


<asp:Content ID="Content1" ContentPlaceHolderID="cphPageHost" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
    <div class="container">
        <div class="row ektron-large-vertical-padding ektron-mega-top-padding">
            <div class="span4 hidden-phone">
		<!-- Sectional Menu -->
                <uc1:SectionalMenu runat="server" ID="SectionalMenu" MasterControlId="Menu1" />
		<!-- End Sectional Menu -->
            </div>
            <div class="span8 ektron-content">
                <h1>
                    <%=NewsTitle %>
				</h1>
                <p>
                    <%=NewsDate %>
				</p>
                   <%=NewsBodyText %> 
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

