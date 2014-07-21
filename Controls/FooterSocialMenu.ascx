<%@ Control Language="C#" AutoEventWireup="true" CodeFile="FooterSocialMenu.ascx.cs" Inherits="Source_Controls_FooterSocialMenu" %>
<asp:Repeater ID="SocialMenu" runat="server">
    <ItemTemplate>
        <div class="ektron-social-link">
            <a href='<%#Eval("Href") %>' title='<%#Eval("Text") %>' target="_blank">
<img src='<%#Eval("ImagePath") %>' alt='<%#Eval("Text") %>'/>
</a>
        </div>
    </ItemTemplate>
</asp:Repeater>
