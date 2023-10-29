package com.sxm.demo.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sxm.demo.models.NoteModel;
import com.sxm.demo.models.UserModel;

@Repository
public interface INoteRepository extends JpaRepository<NoteModel, Long> {

    List<NoteModel> findByUser(UserModel user);

}
