package app.iut.gethacked.domain;



import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Contract.
 */
@Entity
@Table(name = "contract")
public class Contract implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pdf")
    private String pdf;

    @Column(name = "jhi_date")
    private Instant date;

    @OneToOne
    @JoinColumn(unique = true)
    private ThirdParty provider;

    @OneToOne
    @JoinColumn(unique = true)
    private ThirdParty client;

    @OneToOne
    @JoinColumn(unique = true)
    private Request request;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPdf() {
        return pdf;
    }

    public Contract pdf(String pdf) {
        this.pdf = pdf;
        return this;
    }

    public void setPdf(String pdf) {
        this.pdf = pdf;
    }

    public Instant getDate() {
        return date;
    }

    public Contract date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public ThirdParty getProvider() {
        return provider;
    }

    public Contract provider(ThirdParty thirdParty) {
        this.provider = thirdParty;
        return this;
    }

    public void setProvider(ThirdParty thirdParty) {
        this.provider = thirdParty;
    }

    public ThirdParty getClient() {
        return client;
    }

    public Contract client(ThirdParty thirdParty) {
        this.client = thirdParty;
        return this;
    }

    public void setClient(ThirdParty thirdParty) {
        this.client = thirdParty;
    }

    public Request getRequest() {
        return request;
    }

    public Contract request(Request request) {
        this.request = request;
        return this;
    }

    public void setRequest(Request request) {
        this.request = request;
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
        Contract contract = (Contract) o;
        if (contract.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contract.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Contract{" +
            "id=" + getId() +
            ", pdf='" + getPdf() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
