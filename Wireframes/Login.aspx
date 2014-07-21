<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/MainMasterFixed.master" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Source_Wireframes_Login" %>

<%@ Register Src="~/Source/Controls/Login.ascx" TagPrefix="uc1" TagName="Login" %>


<asp:Content ID="Content1" ContentPlaceHolderID="cphPageHost" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
    <div id="login">
        <uc1:Login runat="server" ID="Login1" />

    </div>
    <div class="ektron-black-texture ektron-mega-top-padding ektron-huge-bottom-padding">
        <div class="container">
            <div class="row">
                <div>
                    <div class="ektron-940-huge-horizontal-margin ektron-724-float-widgets-50">
   


                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

