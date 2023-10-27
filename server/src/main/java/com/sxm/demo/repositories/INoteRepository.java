package com.sxm.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sxm.demo.models.NoteModel;

@Repository
public interface INoteRepository extends JpaRepository<NoteModel, Long> {

}
