package app.iut.gethacked.web.rest;
import app.iut.gethacked.domain.Contract;
import app.iut.gethacked.repository.ContractRepository;
import app.iut.gethacked.web.rest.errors.BadRequestAlertException;
import app.iut.gethacked.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Contract.
 */
@RestController
@RequestMapping("/api")
public class ContractResource {

    private final Logger log = LoggerFactory.getLogger(ContractResource.class);

    private static final String ENTITY_NAME = "contract";

    private final ContractRepository contractRepository;

    public ContractResource(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    /**
     * POST  /contracts : Create a new contract.
     *
     * @param contract the contract to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contract, or with status 400 (Bad Request) if the contract has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contracts")
    public ResponseEntity<Contract> createContract(@RequestBody Contract contract) throws URISyntaxException {
        log.debug("REST request to save Contract : {}", contract);
        if (contract.getId() != null) {
            throw new BadRequestAlertException("A new contract cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contract result = contractRepository.save(contract);
        return ResponseEntity.created(new URI("/api/contracts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contracts : Updates an existing contract.
     *
     * @param contract the contract to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contract,
     * or with status 400 (Bad Request) if the contract is not valid,
     * or with status 500 (Internal Server Error) if the contract couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contracts")
    public ResponseEntity<Contract> updateContract(@RequestBody Contract contract) throws URISyntaxException {
        log.debug("REST request to update Contract : {}", contract);
        if (contract.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Contract result = contractRepository.save(contract);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contract.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contracts : get all the contracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contracts in body
     */
    @GetMapping("/contracts")
    public List<Contract> getAllContracts() {
        log.debug("REST request to get all Contracts");
        return contractRepository.findAll();
    }

    /**
     * GET  /contracts/:id : get the "id" contract.
     *
     * @param id the id of the contract to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contract, or with status 404 (Not Found)
     */
    @GetMapping("/contracts/{id}")
    public ResponseEntity<Contract> getContract(@PathVariable Long id) {
        log.debug("REST request to get Contract : {}", id);
        Optional<Contract> contract = contractRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contract);
    }

    /**
     * DELETE  /contracts/:id : delete the "id" contract.
     *
     * @param id the id of the contract to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contracts/{id}")
    public ResponseEntity<Void> deleteContract(@PathVariable Long id) {
        log.debug("REST request to delete Contract : {}", id);
        contractRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
