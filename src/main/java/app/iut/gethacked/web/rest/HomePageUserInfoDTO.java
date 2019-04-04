package app.iut.gethacked.web.rest;

public class HomePageUserInfoDTO {
    private String userName;

    public HomePageUserInfoDTO(String userName) {
        super();
        this.userName = userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }
}
