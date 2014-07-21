<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Login.ascx.cs" Inherits="Source_Controls_Login" %>
<%@ Register Assembly="Ektron.Cms.Framework.UI.Controls.EktronUI" Namespace="Ektron.Cms.Framework.UI.Controls.EktronUI" TagPrefix="ektronUI" %>

<div class="container">
    <div class="row ektron-large-vertical-padding ektron-mega-top-padding">
        <div class="span12 ektron-content">
            <div class="ektron-large-bottom-margin">
                <h1>
                   <%=Resources.Text.Login %> 
                </h1>
                <p>
                   <%=Resources.Text.LoginInstructions %>
                </p>
                <p>
                </p>
                <div id="login-form">
                    <fieldset>
                        <p><ektronUI:Label ID="uxStatusLabel" runat="server" Text="Label"></ektronUI:Label>
                        </p>
                        <ektronUI:Label ID="uxUserNamelbl" runat="server" Text="UserName" AssociatedControlID="uxUserNametxt"></ektronUI:Label><br />
                        <ektronUI:TextField ID="uxUserNametxt" runat="server"></ektronUI:TextField><br />
                        <ektronUI:Label ID="uxPasswordlbl" runat="server" Text="Password" AssociatedControlID="uxPasswordtxt"></ektronUI:Label><br />
                        <asp:TextBox ID="uxPasswordtxt" runat="server" TextMode="Password"></asp:TextBox><br />
                        <ektronUI:Button ID="uxSubmit" runat="server" Text="Login" OnClick="uxSubmit_Click"> </ektronUI:Button>
                        <p>
                            <asp:Literal ID="uxMessage" runat="server"></asp:Literal>
                        </p>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</div>