<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MainMenu.ascx.cs" Inherits="Source_Controls_MainMenu" %>
<%@ Register Assembly="Ektron.Cms.Framework.UI.Controls" Namespace="Ektron.Cms.Framework.UI.Controls.Views" TagPrefix="cc2" %>
<%@ Register Assembly="Ektron.Cms.Framework.UI.Controls" Namespace="Ektron.Cms.Framework.UI.Controls" TagPrefix="cc1" %>

<style type="text/css">
    li.hideme {
        display: none;
    }
</style>
<cc1:MenuModelSource ID="UxMasterMenuModelSource" runat="server">
    
</cc1:MenuModelSource>
<cc2:MenuView ID="UxMasterMenuView" ModelSourceID="UxMasterMenuModelSource" runat="server">
    <ListTemplate>
        <ul id="menunav" runat="server">
            <asp:PlaceHolder ID="listPlaceholder" runat="server"></asp:PlaceHolder>
        </ul>
    </ListTemplate>
    <ItemTemplate>
        <li class='<%#((Eval("Level").ToString()=="3")) ? "hideme" : ""%>'>
            <asp:HyperLink ID="nodeLink" runat="server" Text='<%#Eval("Text") %>' NavigateUrl='<%#Eval("NavigateUrl") %>'
                itemselected='<%# Eval("Selected") %>' />
            <asp:PlaceHolder runat="server" ID="plc1" Visible='<%#((Eval("Level").ToString() == "1")) ? true : false%>'>
                <div class="ektron-dropdown-menu">
                    <div class="row ektron-large-vertical-padding ektron-460-no-padding">
                        <div class="span3 visible-desktop">
                            <div class="ektron-padding-medium">
                            </div>
                        </div>
                        <div class="span5 ektron-724-span8 ektron-460-full">
                            <div class="ektron-med-vertical-padding ektron-menu-middle ektron-large-left-margin ektron-460-no-padding">
                                <div class="ektron-menu-middle-heading">
                                    <%# Eval("Text")%></div>
            </asp:PlaceHolder>
            <asp:PlaceHolder ID="itemPlaceholder" runat="server"></asp:PlaceHolder>
            <asp:PlaceHolder runat="server" ID="plc2" Visible='<%#((Eval("Text").ToString() == "1")) ? true : false%>'>
                </div> </div> </div> </div> 
            </asp:PlaceHolder>
        </li>
    </ItemTemplate>
</cc2:MenuView>
