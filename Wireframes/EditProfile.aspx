<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/MainMasterFixed.master" AutoEventWireup="true" CodeFile="EditProfile.aspx.cs" Inherits="Source_Wireframes_EditProfile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphPageHost" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
    <div class="container">
        <asp:Literal ID="litErrorMsg" runat="server"></asp:Literal>
        <div class="row ektron-large-vertical-padding ektron-mega-top-padding" id="divRegistrationwrapper" runat="server">
            <div class="span4 hidden-phone">
            </div>
            <div class="span8 ektron-content">
                <!-- Start of Content Section -->
                <div class="ektron-large-bottom-margin">
                     <h1>
                        <asp:Literal ID="litTitle" runat="server"></asp:Literal> 
		             </h1>
                        <asp:Literal ID="litContent" runat="server"></asp:Literal>
 
                    <br />
                    <p>
                        <div id="contact-form">
                            <fieldset>
                            <asp:Label ID="lblFirstname" runat="server"><%=Resources.Text.RegisterFirstNameLbl %></asp:Label><br />
                            <asp:TextBox ID="txtFirstName" runat="server"></asp:TextBox><br />
                            <asp:Label ID="lblLastname" runat="server"><%=Resources.Text.RegisterLastNameLbl %></asp:Label><br />
                            <asp:TextBox ID="txtLastname" runat="server"></asp:TextBox><br />
                            <label id="lblEmail" runat="server"><%=Resources.Text.RegisterEmailLbl %></label>
                            <asp:TextBox ID="txtEmail" runat="server"></asp:TextBox><br />
                            <asp:Label runat="server" ID="lblPhone"><%=Resources.Text.RegisterPhoneLbl %></asp:Label><br />
                            <asp:TextBox ID="txtPhone" runat="server"></asp:TextBox><br />
                            <label id="lblCountry" runat="server"><%=Resources.Text.RegisterCountryLbl %></label>
                            <asp:DropDownList ID="ddlCountrylist" runat="server">
                                    <asp:ListItem>Select</asp:ListItem>
                                    <asp:ListItem>Australia</asp:ListItem>
                                    <asp:ListItem>United Kingdom</asp:ListItem>
                                    <asp:ListItem>United States</asp:ListItem>
                            </asp:DropDownList>

                                <br />
                            <label id="lblUsername" runat="server"><%=Resources.Text.RegisterUsernameLbl %></label>
                            <asp:TextBox ID="txtUsername" runat="server"></asp:TextBox><br />
                            <label id="lblPassword" runat="server"><%=Resources.Text.RegisterPasswordLbl %></label>
                            <asp:TextBox ID="txtPassword" runat="server" TextMode="Password"></asp:TextBox><br />
                            <asp:Label ID="lblNotifications" runat="server"><%=Resources.Text.RegisterNotificationsLbl %></asp:Label><br />
                            <asp:Label ID="lblHotDeals" runat="server"><asp:CheckBox ID="chkHotDeals" runat="server" /><%=Resources.Text.RegisterHotDealsLbl %></asp:Label><br />
                            <asp:Label ID="lblNews" runat="server"><asp:CheckBox ID="chkNews" runat="server" /><%=Resources.Text.RegisterNewsLbl %></asp:Label>
                                <br />
                                <br />
                                <br />
                            <asp:Button ID="btncreateaccount" runat="server" Text="Create My Account" OnClick="btncreateaccount_Click" />   
                            </fieldset>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

