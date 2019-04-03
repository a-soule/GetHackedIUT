package app.iut.gethacked.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ThirdParty.
 */
@Entity
@Table(name = "third_party")
public class ThirdParty implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trade_name")
    private String tradeName;

    @OneToMany(mappedBy = "thirdParty")
    private Set<UserThirdPartyMembership> userThirdPartyMemberships = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTradeName() {
        return tradeName;
    }

    public ThirdParty tradeName(String tradeName) {
        this.tradeName = tradeName;
        return this;
    }

    public void setTradeName(String tradeName) {
        this.tradeName = tradeName;
    }

    public Set<UserThirdPartyMembership> getUserThirdPartyMemberships() {
        return userThirdPartyMemberships;
    }

    public ThirdParty userThirdPartyMemberships(Set<UserThirdPartyMembership> userThirdPartyMemberships) {
        this.userThirdPartyMemberships = userThirdPartyMemberships;
        return this;
    }

    public ThirdParty addUserThirdPartyMembership(UserThirdPartyMembership userThirdPartyMembership) {
        this.userThirdPartyMemberships.add(userThirdPartyMembership);
        userThirdPartyMembership.setThirdParty(this);
        return this;
    }

    public ThirdParty removeUserThirdPartyMembership(UserThirdPartyMembership userThirdPartyMembership) {
        this.userThirdPartyMemberships.remove(userThirdPartyMembership);
        userThirdPartyMembership.setThirdParty(null);
        return this;
    }

    public void setUserThirdPartyMemberships(Set<UserThirdPartyMembership> userThirdPartyMemberships) {
        this.userThirdPartyMemberships = userThirdPartyMemberships;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ThirdParty thirdParty = (ThirdParty) o;
        if (thirdParty.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), thirdParty.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ThirdParty{" +
            "id=" + getId() +
            ", tradeName='" + getTradeName() + "'" +
            "}";
    }
}
